import React from "react";
import Reflux from "reflux";
import { IntlMixin, FormattedMessage } from "react-intl";
import classNames from "classnames";
import path from "path";
import { Sounds } from "../../stores";
import SoundItemClass from "../../classes/sound.js";
import { soundActions } from "../../actions";
import { Image } from "../ui";

export default React.createClass({
  propTypes: SoundItemClass,
  mixins: [ Reflux.connect(Sounds, "sounds"), IntlMixin ],
  handleClick() {
    if (!this.alreadyAdded()) {
      const name = this.getIntlMessage("sounds." + this.props.name.replace(/\s+/g, "_").toLowerCase());
      soundActions.getCustomURL(name, this.props.file, "file", this.props.img);
    }
  },
  alreadyAdded() {
    return this.state.sounds.filter(_s => path.basename(this.props.file, ".mp3") === path.basename(_s.file, ".mp3")).count() === 1;
  },
  render() {
    return (
      <div className={classNames("kakapo-item", {"disabled": this.alreadyAdded()})} onClick={this.handleClick}>
        <div className="thumbnail">
          <Image img={`http://data.kakapo.co/images/dark-${this.props.img}`}/>
        </div>
        <span className="title">
          <FormattedMessage message={this.getIntlMessage("sounds." + this.props.name.replace(/\s+/g, "_").toLowerCase())} />
        </span>
    </div>
    );
  }
});
