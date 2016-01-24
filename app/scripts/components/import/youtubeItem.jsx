import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, FormattedNumber } from 'react-intl';
import { youtubeItemClass } from 'classes/';
import { soundActions } from 'actions/';

class YouTubeItem extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {
    soundActions: PropTypes.object,
    sound: PropTypes.shape(youtubeItemClass)
  };

  handleClick = () => {
    this.props.soundActions.addSound('youtube', {
      file: this.props.sound.videoId,
      img: this.props.sound.img,
      link: `https://www.youtube.com/watch?v=${this.props.sound.videoId}`,
      name: this.props.sound.name,
      source: 'youtubeStream',
      tags: this.props.sound.tags
    });
    this.context.router.push('/');
  };

  render() {
    return (
      <div className="youtube-item" onClick={this.handleClick}>
        <div className="thumbnail">
          <img src={this.props.sound.img}/>
          <span className="duration">
            {this.props.sound.duration}
          </span>
        </div>
        <span className="title">
          {this.props.sound.name}
          <span className="view-count">
            <FormattedNumber value={this.props.sound.viewCount}/> <FormattedMessage id="youtube.views"/>
          </span>
        </span>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default injectIntl(connect(() => ({}), mapDispatchToProps)(YouTubeItem));
