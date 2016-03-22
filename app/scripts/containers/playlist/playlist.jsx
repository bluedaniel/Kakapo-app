import React, { PropTypes } from 'react';
import Clipboard from 'clipboard';
import shortid from 'shortid';
import kakapoAssets from 'kakapo-assets';
import { soundActions } from 'actions/';
import { toasterInstance, handleStopPropagation } from 'utils/';
import awsCredentials from '../../../../aws.json';
import 'aws-custom-build';
import './playlist.css';

const AWS = window.AWS;
AWS.config.update(awsCredentials);

const table = new AWS.DynamoDB({ params: { TableName: 'kakapo-playlists' } });

export default function Playlist({ sounds, themes, params, intl, dispatch }, { router }) {
  if (params.shareId) {
    const clipboard = new Clipboard('.copy-clipboard');
    clipboard.on('success', () => toasterInstance().then(_t => _t.toast('Playlist link copied!')));
  }

  const setSoundsToPlaylist = (playlist) => {
    Object.keys(playlist).map(_p => {
      dispatch(soundActions.resetSounds(true));
      switch (playlist[_p].source) {
        case 'youtubeStream':
          return dispatch(soundActions.addSound('youtube', playlist[_p], false));
        case 'soundcloudStream':
          return dispatch(soundActions.addSound('soundcloud', playlist[_p].file, false));
        default:
          return dispatch(soundActions.addSound('kakapo', playlist[_p], false));
      }
    });
    router.push('/');
  };

  const getFromDynamo = (id) => {
    table.getItem({ Key: { shareID: { S: id } } }, (err, data) => {
      if (err) toasterInstance().then(_t => _t.toast(err));
      if (data.Item) {
        setSoundsToPlaylist(JSON.parse(atob(data.Item.playlistID.S)));
      } else {
        toasterInstance().then(_t => _t.toast('Error: Playlist not found'));
      }
    });
  };

  const resetSounds = () => {
    dispatch(soundActions.resetSounds(false));
    router.push('/');
  };

  const createPlaylist = () => {
    const currentPlaylistHash = btoa(JSON.stringify(sounds));
    const shareID = shortid.generate();
    const putItem = { Item: { shareID: { S: shareID }, playlistID: { S: currentPlaylistHash } } };
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
      const url = location.hostname + (__DEV__ ? `:${location.port}` : 'kakapo.co/#/playlist/');
      return (
        <div>
          <p>{intl.formatMessage({ id: 'playlist.share_created' })}</p>
          <form className="form">
            <input className="input-1" id="copyClipboard"
              value={`${url}/playlist/${params.shareId}`} readOnly
            />
            <button className="copy-clipboard" data-clipboard-target="#copyClipboard"
              onClick={handleStopPropagation}
            >
              <span title="Copy to clipboard" />
            </button>
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
    toasterInstance().then(_t => _t.toast('Loading new playlist ...'));
    getFromDynamo(params.playlistId);
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
          <span onClick={() => getFromDynamo(kakapoAssets.playlists[_e])}
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
