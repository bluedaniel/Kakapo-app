import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, FormattedNumber } from 'react-intl';
import { youtubeItemClass } from '../../classes';
import { Image } from '../ui';
import { soundActions } from '../../actions';

class YouTubeItem extends Component {
  static contextTypes = {
    history: PropTypes.object
  }

  static propTypes = {
    soundActions: PropTypes.object,
    sound: PropTypes.shape(youtubeItemClass)
  }

  handleClick = () => {
    this.props.soundActions.addSound('youtube', {
      id: this.props.sound.videoId,
      thumbnail: this.props.sound.img,
      title: this.props.sound.name,
      tags: this.props.sound.tags
    });
    this.context.history.push('/downloads');
  }

  render() {
    return (
      <div className="youtube-item" onClick={this.handleClick}>
        <div className="thumbnail">
          <Image img={this.props.sound.img}/>
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
