import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { soundActions } from '../../actions';
import './nav.css';

class Nav extends Component {
  static propTypes = {
    settings: PropTypes.object,
    soundActions: PropTypes.object,
    themes: PropTypes.object
  }

  state = { mute: false }

  handleMute = () => {
    this.setState({ mute: !this.state.mute }, () => this.props.soundActions.soundsMute(this.state.mute));
  }

  renderDragOrDownload() {
    if (__DESKTOP__) {
      return (<span className="drag"/>);
    }
    return (
      <a className="download-app" href="http://www.kakapo.co/app.html" target="_blank">
        <FormattedMessage id="nav.app"/>
      </a>
    );
  }

  render() {
    return (
      <div className={classNames('topbar', {
        dark: this.props.themes.get('darkUI')
      })} style={this.props.themes.getIn([ 'header', 'download' ]).toJS()}>
        <div className="container">
          <span
            className={classNames('mute', 'hint--right', {
              muted: this.state.mute,
              dark: this.props.themes.get('darkUI')
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

const mapStateToProps = state => ({
  settings: state.settings,
  themes: state.themes
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Nav));
