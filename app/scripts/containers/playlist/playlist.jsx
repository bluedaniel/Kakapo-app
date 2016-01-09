import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Clipboard from 'clipboard';
import shortid from 'shortid';
import kakapoAssets from 'kakapo-assets';
import { soundActions } from '../../actions';
import { toasterInstance } from '../../utils';
import awsCredentials from '../../../../aws.json';
import 'aws-sdk/dist/aws-sdk';
import './playlist.css';

const AWS = window.AWS;
AWS.config.update(awsCredentials);

const table = new AWS.DynamoDB({ params: { TableName: 'kakapo-playlists' } });

class Playlist extends Component {
  static contextTypes = {
    history: PropTypes.object
  };

  static propTypes = {
    themes: PropTypes.object
  };

  state = {
    playlistUrl: null,
    loadingPlaylist: false
  };

  componentDidMount() {
    var clipboard = new Clipboard('.copy-clipboard');
    clipboard.on('success', () => toasterInstance().then(_t => _t.toast('Playlist link copied!')));
    this.getParam();
  }

  componentDidUpdate() {
    this.getParam();
  }

  getParam = () => {
    if (this.props.params.playlistId && !this.state.loadingPlaylist) {
      this.setState({ loadingPlaylist: true });

      toasterInstance().then(_t => _t.toast('Loading playlist ...'));

      table.getItem({ Key: { shareID: { S: this.props.params.playlistId } } }, (err, data) => {
        if (err) toasterInstance().then(_t => _t.toast(err));
        if (data.Item) {
          this.setSoundsToPlaylist(JSON.parse(atob(data.Item.playlistID.S)));
        } else {
          toasterInstance().then(_t => _t.toast('Error: Playlist not found'));
        }
        this.setState({ loadingPlaylist: false });
      });

      this.context.history.push('/');
    }
  };

  createPlaylist = () => {
    const currentPlaylistHash = btoa(JSON.stringify(this.props.sounds));
    let shareID = shortid.generate();
    let putItem = { Item: { shareID: { S: shareID }, playlistID: { S: currentPlaylistHash } } };
    table.putItem(putItem, () => this.setState({ playlistUrl: shareID }));
  };

  resetSounds = () => {
    this.props.soundActions.resetSounds(false);
    this.context.history.push('/');
  };

  setSoundsToPlaylist = (playlist) => Object.keys(playlist).map(_p => {
    this.props.soundActions.resetSounds(true);
    switch (playlist[_p].source) {
      case 'youtubeStream':
        this.props.soundActions.addSound('youtube', playlist[_p], false);
        break;
      case 'soundcloudStream':
        this.props.soundActions.addSound('soundcloud', playlist[_p].file, false);
        break;
      default:
        this.props.soundActions.addSound('kakapo', playlist[_p], false);
        break;
    }
    toasterInstance().then(_t => _t.hide());
  });

  handleStopPropagation(el) {
    el.preventDefault();
    el.stopPropagation();
  }

  renderShare() {
    if (this.state.playlistUrl) {
      const url = location.hostname + (__DEV__ ? `:${location.port}` : '');
      return (
        <div>
          <p><FormattedMessage id="playlist.share_created"/></p>
          <form className="pure-form">
            <input className="pure-input-1" id="copyClipboard" value={`${url}/playlist/${this.state.playlistUrl}`} readOnly/>
            <button className="copy-clipboard" data-clipboard-target="#copyClipboard" onClick={this.handleStopPropagation}>
              <span title="Copy to clipboard"/>
            </button>
          </form>
        </div>
      );
    }
    return (
      <a className="pure-button" onClick={this.createPlaylist}>
        <FormattedMessage id="playlist.share"/>
      </a>
    );
  }

  renderDesktopPlaylistInput() {
    return (
      <div>
        <p><FormattedMessage id="playlist.input_playlist"/></p>
        <form className="pure-form">
          <div className="InputAddOn">
            <span className="InputAddOn-item">playlist/</span>
            <input className="pure-input-1"/>
          </div>
        </form>
      </div>
    );
    // playlist/NyWMXk5De
  }

  render() {
    if (this.state.loadingPlaylist) return null;
    return (
      <div className="modal playlist-pane">
        <div className="modal-inner">
          <h3><FormattedMessage id="playlist.header"/></h3>
          {this.renderShare()}
          <p><FormattedMessage id="playlist.subheading"/></p>
          <a className="pure-button" onClick={this.resetSounds}><FormattedMessage id="playlist.list_reset"/></a>
          {Object.keys(kakapoAssets.playlists).map(_e => (
            <Link to={`/playlist/${kakapoAssets.playlists[_e]}`} className="pure-button" key={_e}>
              <FormattedMessage id={`playlist.list_${_e}`}/>
            </Link>
          ))}
          {__DESKTOP__ ? this.renderDesktopPlaylistInput() : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sounds: state.sounds,
  themes: state.themes
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Playlist));
