import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { soundActions } from 'actions/';
import './nav.css';

export default class Nav extends Component {
  static propTypes = {
    settings: PropTypes.object,
    soundActions: PropTypes.object,
    themes: PropTypes.object
  };

  state = { mute: false };

  handleMute = () => {
    this.setState({ mute: !this.state.mute }, () => this.props.dispatch(soundActions.soundsMute(this.state.mute)));
  };

  renderDragOrDownload() {
    if (__DESKTOP__) {
      return (<span className="drag"/>);
    }
    return (
      <a className="download-app" href="http://www.kakapo.co/app.html" target="_blank">
        {this.props.intl.formatMessage({ id: 'nav.app' })}
      </a>
    );
  }

  render() {
    let { themes, intl } = this.props;
    return (
      <div className={classNames('topbar', {
        dark: themes.get('darkUI')
      })} style={themes.getIn([ 'header', 'download' ]).toJS()}>
        <div className="container">
          <span
            className={classNames('mute', 'hint--right', {
              muted: this.state.mute,
              dark: themes.get('darkUI')
            })}
            data-hint={this.state.mute ? 'Unmute' : 'Mute'}
            onClick={this.handleMute}
          />
          {this.renderDragOrDownload()}
          <div className="share">
            {__WEB__ ? <div className="fb-share-button" data-href="http://www.kakapo.co" data-layout="button_count"/> : null}
            <a href="https://twitter.com/share" className="twitter-share-button" data-url="http://www.kakapo.co">Tweet</a>
          </div>
        </div>
      </div>
    );
  }
}
