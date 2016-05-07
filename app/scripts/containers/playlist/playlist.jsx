import React, { PropTypes } from 'react';
import Rx from 'rxjs';
import Clipboard from 'clipboard';
import shortid from 'shortid';
import kakapoAssets from 'kakapo-assets';
import { soundActions, notifyActions } from 'actions/';
import { classNames, handleStopPropagation } from 'utils/';
import awsCredentials from '../../../../aws.json';
import 'aws-custom-build';
import './playlist.css';

const AWS = window.AWS;
AWS.config.update(awsCredentials);

const table = new AWS.DynamoDB({ params: { TableName: 'kakapo-playlists' } });

function observeAutocomplete(dispatch, router) {
  const subject = new Rx.Subject()
  .throttleTime(1000)
  .distinctUntilChanged();

  subject.subscribe({
    next: (id) => {
      table.getItem({ Key: { shareID: { S: id } } }, (err, data) => {
        if (err) dispatch(notifyActions.send(err));
        if (data.Item) {
          router.push('/');
          dispatch(soundActions.resetSounds(true));

          const playlist = JSON.parse(atob(data.Item.playlistID.S));
          Object.keys(playlist).map(_p => {
            switch (playlist[_p].source) {
              case 'youtubeStream':
                return dispatch(soundActions.addSound('youtube', playlist[_p]));
              case 'soundcloudStream':
                return dispatch(soundActions.addSound('soundcloud', playlist[_p].file));
              default:
                return dispatch(soundActions.addSound('kakapo', playlist[_p]));
            }
          });
        } else {
          dispatch(notifyActions.send('Error: Playlist not found'));
          router.push('/');
        }
      });
    }
  });

  return subject;
}

export default function Playlist({ sounds, themes, params, intl, dispatch }, { router }) {
  const clipBoardClass = `copy-clipboard-${shortid.generate()}`;

  const subject = observeAutocomplete(dispatch, router);

  if (params.shareId) {
    const clipboard = new Clipboard(`.${clipBoardClass}`);
    clipboard.on('success', () => dispatch(notifyActions.send('Playlist link copied!')));
  }

  const resetSounds = () => {
    dispatch(soundActions.resetSounds(false));
    router.push('/');
  };

  const createPlaylist = () => {
    const playlistID = btoa(JSON.stringify(sounds));
    const shareID = shortid.generate();
    const putItem = { Item: { shareID: { S: shareID }, playlistID: { S: playlistID } } };
    table.putItem(putItem, () => router.push(`/share-playlist/${shareID}`));
  };

  const handleDesktopPlaylistInput = (e) => {
    if (e.keyCode === 13) {
      handleStopPropagation(e);
      router.push('/playlist/${e.target.value}');
    }
  };

  const renderShare = () => {
    if (params.shareId) {
      const baseUrl = `http://${location.hostname}${(__DEV__ ? `:${location.port}` : 'kakapo.co')}`;
      return (
        <div>
          <p>{intl.formatMessage({ id: 'playlist.share_created' })}</p>
          <form className="form">
            <div className="InputAddOn">
              <input className="input-1 InputAddOn-field" id="copyClipboard"
                value={`${baseUrl}/#/playlist/${params.shareId}`} readOnly
              />
            <button className={classNames(clipBoardClass, 'InputAddOn-item')}
              data-clipboard-target="#copyClipboard" onClick={handleStopPropagation}
            >
                <span title="Copy to clipboard" />
              </button>
            </div>
          </form>
        </div>
      );
    }
    return (
      <a className="button" onClick={createPlaylist}>
        {intl.formatMessage({ id: 'playlist.share' })}
      </a>
    );
  };

  const renderDesktopPlaylistInput = () => (
    <div>
      <hr />
      <p>{intl.formatMessage({ id: 'playlist.input_playlist' })}</p>
      <form className="form">
        <div className="InputAddOn">
          <span className="InputAddOn-item">kakapo.co/#/playlist/</span>
          <input onKeyDown={handleDesktopPlaylistInput}
            className="input-1 InputAddOn-field" type="text"
          />
        </div>
      </form>
    </div>
  );

  if (params.playlistId) { // Loading new playlist
    subject.next(params.playlistId);
  }

  return (
    <div className="modal playlist-pane">
      <div className="modal-inner">
        <h3>{intl.formatMessage({ id: 'playlist.header' })}</h3>
        {renderShare()}
        <p>{intl.formatMessage({ id: 'playlist.subheading' })}</p>
        <a className="button" onClick={resetSounds}>
          {intl.formatMessage({ id: 'playlist.list_reset' })}
        </a>
        {Object.keys(kakapoAssets.playlists).map(_e => (
          <span onClick={() => subject.next(kakapoAssets.playlists[_e])}
            className="button" key={_e}
          >
            {intl.formatMessage({ id: `playlist.list_${_e}` })}
          </span>
        ))}
        {__DESKTOP__ ? renderDesktopPlaylistInput() : null}
      </div>
    </div>
  );
}

Playlist.contextTypes = { router: PropTypes.object };
