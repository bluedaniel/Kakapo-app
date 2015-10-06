import React from "react";
import Radium from "radium";
import Reflux from "reflux";
import classNames from "classnames";
import waves from "node-waves";
import throttle from "lodash/function/throttle";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { soundActions } from "../actions";
import { Theme } from "../stores";
import SoundClass from "../classes/sound";
import { Image } from "./ui";

export default new Radium(React.createClass({
  propTypes: SoundClass,
  mixins: [Reflux.connect(Theme, "theme"), PureRenderMixin],
  componentWillMount() {
    this.handleChangeVolume = throttle(this.handleChangeVolume, 250);
  },
  handleToggle() {
    waves.ripple(this.refs.item);
    soundActions.togglePlayPause(this.props);
  },
  handleDelete(e) {
    this.handleStopPropagation(e);
    soundActions.removeSound(this.props);
  },
  handleEdit(e) {
    this.handleStopPropagation(e);
    soundActions.editSound(this.props);
  },
  handleChangeVolume() {
    soundActions.changeVolume(this.props, parseFloat(this.refs.volume.value));
  },
  handleStopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  renderActions() {
    return (
      <ul className="actions" style={this.state.theme.soundList.actions}>
        {this.props.link ? (
          <li>
            <a href={this.props.link} target="_blank">
              <i className={classNames("icon-share", {
                "dark": !this.props.playing
              })}/>
            </a>
          </li>) : ""}
        {this.props.source !== "youtubeStream" ? (
          <li onClick={this.handleEdit}>
            <i className={classNames("icon-pencil", {
              "dark": !this.props.playing
            })}/></li>) : ""}
        <li onClick={this.handleDelete}>
          <i className={classNames("icon-trash", {
            "dark": !this.props.playing
          })}/>
        </li>
      </ul>
    );
  },
  render() {
    // Image size is relative to the volume
    let itemClass = classNames({
      "playing": this.props.playing,
      "paused": !this.props.playing,
      "youtube-stream": this.props.source === "youtubeStream"
    });

    let img = this.props.img;
    if (this.props.source === "file") {
      img = `../app/images/${this.props.playing ? "light-" : "dark-"}${this.props.img}`;
    }
    return (
      <div
        className={classNames("item", "waves-effect", "waves-block", itemClass)}
        onClick={this.handleToggle}
        ref="item"
        style={[this.state.theme.soundList.item, this.props.playing && this.state.theme.soundList.itemPlaying]}
      >
        <div className="inner">
          <Image img={img}/>
          {this.renderActions()}
          <span className="title">
            {this.props.name}
          </span>
          <input
            defaultValue={this.props.volume}
            max="1"
            min="0"
            onChange={this.handleChangeVolume}
            onClick={this.handleStopPropagation}
            ref="volume"
            step="0.001"
            type="range"
          />
        </div>
      </div>
    );
  }
}));
