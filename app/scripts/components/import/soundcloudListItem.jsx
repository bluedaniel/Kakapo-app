import React from "react";
import { History } from "react-router";
import SoundCloudItemClass from "../../classes/soundcloudItem";
import { IntlMixin, FormattedMessage, FormattedNumber } from "react-intl";
import { Image } from "../ui";
import { soundActions } from "../../actions";

export default React.createClass({
  propTypes: SoundCloudItemClass,
  mixins: [ History, IntlMixin ],
  handleClick() {
    soundActions.getSoundCloudURL(this.props.scId);
    this.history.pushState(null, "/downloads");
  },
  render() {
    return (
      <div className="soundcloud-item" onClick={this.handleClick}>
        <div className="thumbnail">
          <div className="user-avatar">
            <Image img={this.props.userAvatar}/>
          </div>
          <Image img={this.props.img}/>
          <span className="duration">
            {this.props.duration}
          </span>
        </div>
        <span className="title">
          {this.props.name}
          <span className="view-count">
            <FormattedNumber value={this.props.viewCount}/> <FormattedMessage message={this.getIntlMessage("soundcloud.plays")}/>
          </span>
        </span>
    </div>
    );
  }
});
