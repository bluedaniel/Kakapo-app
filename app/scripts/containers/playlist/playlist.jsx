import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Clipboard from 'clipboard';
import shortid from 'shortid';
import kakapoAssets from 'kakapo-assets';
import { intlShape } from 'react-intl';
import { soundActions } from 'actions/';
import { toasterInstance } from 'utils/';
import awsCredentials from '../../../../aws.json';
import 'aws-custom-build';
import './playlist.css';

const AWS = window.AWS;
AWS.config.update(awsCredentials);

const table = new AWS.DynamoDB({ params: { TableName: 'kakapo-playlists' } });

export default class Playlist extends Component {
  static propTypes = {
    themes: PropTypes.object,
    params: PropTypes.object,
    sounds: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    playlistUrl: null,
    loadingPlaylist: false
  };

  componentDidMount() {
    const clipboard = new Clipboard('.copy-clipboard');
    clipboard.on('success', () => toasterInstance().then(_t => _t.toast('Playlist link copied!')));
    this.getParam(this.props.params.playlistId);
  }

  componentDidUpdate() {
    this.getParam(this.props.params.playlistId);
  }

  getParam = (playlistId) => {
    if (playlistId && !this.state.loadingPlaylist) {
      this.setState({ loadingPlaylist: true });

      toasterInstance().then(_t => _t.toast('Loading playlist ...'));

      table.getItem({ Key: { shareID: { S: playlistId } } }, (err, data) => {
        if (err) toasterInstance().then(_t => _t.toast(err));
        if (data.Item) {
          this.setSoundsToPlaylist(JSON.parse(atob(data.Item.playlistID.S)));
        } else {
          toasterInstance().then(_t => _t.toast('Error: Playlist not found'));
        }
        this.setState({ loadingPlaylist: false });
      });

      this.context.router.push('/');
    }
  };

  setSoundsToPlaylist = (playlist) => Object.keys(playlist).map(_p => {
    this.props.dispatch(soundActions.resetSounds(true));
    switch (playlist[_p].source) {
      case 'youtubeStream':
        this.props.dispatch(soundActions.addSound('youtube', playlist[_p], false));
        break;
      case 'soundcloudStream':
        this.props.dispatch(soundActions.addSound('soundcloud', playlist[_p].file, false));
        break;
      default:
        this.props.dispatch(soundActions.addSound('kakapo', playlist[_p], false));
        break;
    }
  });

  resetSounds = () => {
    this.props.dispatch(soundActions.resetSounds(false));
    this.context.router.push('/');
  };

  createPlaylist = () => {
    const currentPlaylistHash = btoa(JSON.stringify(this.props.sounds));
    const shareID = shortid.generate();
    const putItem = { Item: { shareID: { S: shareID }, playlistID: { S: currentPlaylistHash } } };
    table.putItem(putItem, () => this.setState({ playlistUrl: shareID }));
  };

  handleDesktopPlaylistInput = (el) => {
    this.getParam(this.refs.desktopPlaylist.value);
    el.preventDefault();
  };

  handleStopPropagation(el) {
    el.preventDefault();
    el.stopPropagation();
  }

  renderShare() {
    if (this.state.playlistUrl) {
      const url = location.hostname + (__DEV__ ? `:${location.port}` : '');
      return (
        <div>
          <p>{this.props.intl.formatMessage({ id: 'playlist.share_created' })}</p>
          <form className="pure-form">
            <input className="pure-input-1" id="copyClipboard"
              value={`${url}/playlist/${this.state.playlistUrl}`} readOnly
            />
            <button className="copy-clipboard" data-clipboard-target="#copyClipboard"
              onClick={this.handleStopPropagation}
            >
              <span title="Copy to clipboard"/>
            </button>
          </form>
        </div>
      );
    }
    return (
      <a className="pure-button" onClick={this.createPlaylist}>
        {this.props.intl.formatMessage({ id: 'playlist.share' })}
      </a>
    );
  }

  renderDesktopPlaylistInput() {
    return (
      <div>
        <hr/>
        <p>{this.props.intl.formatMessage({ id: 'playlist.input_playlist' })}</p>
        <form onSubmit={this.handleDesktopPlaylistInput} className="pure-form">
          <div className="InputAddOn">
            <span className="InputAddOn-item">kakapo.co/playlist/</span>
            <input className="pure-input-1 InputAddOn-field" ref="desktopPlaylist" type="text"/>
          </div>
        </form>
      </div>
    );
  }

  render() {
    if (this.state.loadingPlaylist) return null;
    return (
      <div className="modal playlist-pane">
        <div className="modal-inner">
          <h3>{this.props.intl.formatMessage({ id: 'playlist.header' })}</h3>
          {this.renderShare()}
          <p>{this.props.intl.formatMessage({ id: 'playlist.subheading' })}</p>
          <a className="pure-button" onClick={this.resetSounds}>
            {this.props.intl.formatMessage({ id: 'playlist.list_reset' })}
          </a>
          {Object.keys(kakapoAssets.playlists).map(_e => (
            <Link to={`/playlist/${kakapoAssets.playlists[_e]}`} className="pure-button" key={_e}>
              {this.props.intl.formatMessage({ id: `playlist.list_${_e}` })}
            </Link>
          ))}
          {__DESKTOP__ ? this.renderDesktopPlaylistInput() : null}
        </div>
      </div>
    );
  }
}
