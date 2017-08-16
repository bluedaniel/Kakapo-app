import React from 'react';
import { push } from 'react-router-redux';
import Clipboard from 'clipboard';
import shortid from 'shortid';
import kakapoAssets from 'kakapo-assets';
import { soundActions, notifyActions } from 'actions/';
import { cx, handleStopPropagation } from 'utils/';
import 'aws-custom-build';
import './playlist.css';

export default ({ params = {}, intl, dispatch, match }) => {
  const clipBoardClass = `copy-clipboard-${shortid.generate()}`;
  console.log(match);

  if (params.shareId) {
    const clipboard = new Clipboard(`.${clipBoardClass}`);
    clipboard.on('success', () =>
      dispatch(notifyActions.send('Playlist link copied!'))
    );
  }

  const resetSounds = () => {
    dispatch(soundActions.reset(false));
    dispatch(push('/'));
  };

  const handleDesktopPlaylistInput = e => {
    if (e.keyCode === 13) {
      handleStopPropagation(e);
      dispatch(push(`/playlist/${e.target.value}`));
    }
  };

  const renderShare = () => {
    if (params.shareId) {
      const baseUrl = `http://${location.hostname}${__DEV__
        ? `:${location.port}`
        : 'kakapo.co'}`;
      return (
        <div>
          <p>
            {intl.formatMessage({ id: 'playlist.share_created' })}
          </p>
          <form className="form">
            <div className="InputAddOn">
              <input
                className="input-1 InputAddOn-field"
                id="copyClipboard"
                value={`${baseUrl}/#/playlist/${params.shareId}`}
                readOnly
              />
              <button
                className={cx(clipBoardClass, 'InputAddOn-item')}
                data-clipboard-target="#copyClipboard"
                onClick={handleStopPropagation}
              >
                <span title="Copy to clipboard" />
              </button>
            </div>
          </form>
        </div>
      );
    }
    return (
      <a
        className="button"
        role="link"
        tabIndex={-1}
        onClick={() => dispatch(soundActions.createPlaylist())}
      >
        {intl.formatMessage({ id: 'playlist.share' })}
      </a>
    );
  };

  const renderDesktopPlaylistInput = () =>
    <div>
      <hr />
      <p>
        {intl.formatMessage({ id: 'playlist.input_playlist' })}
      </p>
      <form className="form">
        <div className="InputAddOn">
          <span className="InputAddOn-item">kakapo.co/#/playlist/</span>
          <input
            type="text"
            onKeyDown={handleDesktopPlaylistInput}
            className="input-1 InputAddOn-field"
          />
        </div>
      </form>
    </div>;

  if (params.playlistId) {
    console.log(params.playlistId);
    // Loading new playlist
    // subject.next(params.playlistId);
  }

  return (
    <div className="modal playlist-pane">
      <div className="modal-inner">
        <h3>
          {intl.formatMessage({ id: 'playlist.header' })}
        </h3>
        {renderShare()}
        <p>
          {intl.formatMessage({ id: 'playlist.subheading' })}
        </p>
        <a role="link" tabIndex={-1} className="button" onClick={resetSounds}>
          {intl.formatMessage({ id: 'playlist.list_reset' })}
        </a>
        {Object.keys(kakapoAssets.playlists).map(_e =>
          <span
            role="link"
            tabIndex={-1}
            className="button"
            key={_e}
            onClick={() =>
              dispatch(soundActions.playlist(kakapoAssets.playlists[_e]))}
          >
            {intl.formatMessage({ id: `playlist.list_${_e}` })}
          </span>
        )}
        {__DESKTOP__ ? renderDesktopPlaylistInput() : null}
      </div>
    </div>
  );
};
