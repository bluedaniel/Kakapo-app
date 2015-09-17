import React from "react";
import Radium from "radium";
import { History } from "react-router";
import YouTubeItemClass from "../../classes/youtubeItem";
import { IntlMixin, FormattedMessage, FormattedNumber } from "react-intl";
import { Image } from "../ui";
import { soundActions } from "../../actions";

export default new Radium(React.createClass({
  propTypes: YouTubeItemClass,
  mixins: [ History, IntlMixin ],
  handleClick() {
    soundActions.getYoutubeURL(this.props.videoId, this.props.name, this.props.img, this.props.tags);
    this.history.pushState(null, "/downloads");
  },
  render() {
    return (
      <div className="youtube-item" onClick={this.handleClick}>
        <div className="thumbnail">
          <Image img={this.props.img}/>
          <span className="duration">
            {this.props.duration}
          </span>
        </div>
        <span className="title">
          {this.props.name}
          <span className="view-count">
            <FormattedNumber value={this.props.viewCount}/> <FormattedMessage message={this.getIntlMessage("youtube.views")}/>
          </span>
        </span>
    </div>
    );
  }
}));
