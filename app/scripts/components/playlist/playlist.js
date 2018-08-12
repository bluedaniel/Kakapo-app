import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { mapObjIndexed, pipe, prop, values } from 'ramda';
import Clipboard from 'clipboard/dist/clipboard';
import shortid from 'shortid';
import kakapoAssets from 'kakapo-assets';
import { soundActions, notifyActions } from 'actions/';
import { cx, handleStopPropagation } from 'utils/';
import 'aws-custom-build';
import './playlist.css';

const Playlist = ({ match: { params }, dispatch }) => {
  if (params.playlistId) {
    dispatch(soundActions.playlist(params.playlistId)); // Load new playlist
  }

  const clipBoardClass = `copy-clipboard-${shortid.generate()}`;
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
      const {
        location: { hostname, port },
      } = window;
      const baseUrl = `http://${hostname}${__DEV__ ? `:${port}` : 'kakapo.co'}`;
      return (
        <div>
          <p>
            <FormattedMessage id="playlist.share_created" />
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
                type="button"
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
        <FormattedMessage id="playlist.share" />
      </a>
    );
  };

  const renderDesktopPlaylistInput = () => (
    <div>
      <hr />
      <p>
        <FormattedMessage id="playlist.input_playlist" />
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
    </div>
  );

  return (
    <div className="modal playlist-pane">
      <div className="modal-inner">
        <h3>
          <FormattedMessage id="playlist.header" />
        </h3>
        {renderShare()}
        <p>
          <FormattedMessage id="playlist.subheading" />
        </p>
        <a role="link" tabIndex={-1} className="button" onClick={resetSounds}>
          <FormattedMessage id="playlist.list_reset" />
        </a>
        {pipe(
          prop('playlists'),
          mapObjIndexed((x, k) => (
            <span
              role="link"
              tabIndex={-1}
              className="button"
              key={k}
              onClick={() => dispatch(soundActions.playlist(x))}
            >
              <FormattedMessage id={`playlist.list_${k}`} />
            </span>
          )),
          values
        )(kakapoAssets)}
        {__DESKTOP__ ? renderDesktopPlaylistInput() : null}
      </div>
    </div>
  );
};

const mapStateToProps = (_, { match }) => ({ match });

export default pipe(
  withRouter,
  connect(mapStateToProps)
)(Playlist);
