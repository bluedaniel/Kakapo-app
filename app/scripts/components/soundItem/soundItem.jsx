import remote from "remote";
import path from "path";
import React from "react";
import Reflux from "reflux";
import classNames from "classnames";
import waves from "node-waves";
import throttle from "lodash/function/throttle";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { soundActions } from "../../actions";
import { Theme } from "../../stores";
import SoundClass from "../../classes/sound";
import { Image } from "../ui";
import "./soundItem.css";

const app = remote.require("app");

export default React.createClass({
  propTypes: SoundClass,
  mixins: [Reflux.connect(Theme, "theme"), PureRenderMixin],
  componentWillMount() {
    this.handleChangeVolume = throttle(this.handleChangeVolume, 250);
  },
  handleToggle() {
    waves.ripple(this.refs.item);
    soundActions.togglePlayPause(this.props);
  },
  handleDelete(el) {
    this.handleStopPropagation(el);
    soundActions.removeSound(this.props);
  },
  handleEdit(el) {
    this.handleStopPropagation(el);
    soundActions.editSound(this.props);
  },
  handleChangeVolume() {
    soundActions.changeVolume(this.props, parseFloat(this.refs.volume.value));
  },
  handleStopPropagation(el) {
    el.preventDefault();
    el.stopPropagation();
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
  renderVideo() {
    if (this.props.source === "youtubeStream") {
      return (
        <div className="youtube-video" id={`video-${this.props.file}`}></div>
      );
    }
  },
  render() {
    let objStyle = this.state.theme.soundList.item;
    if (this.props.playing) objStyle = {...objStyle, ...this.state.theme.soundList.itemPlaying};
    // Image size is relative to the volume
    const itemClass = classNames({
      "playing": this.props.playing,
      "paused": !this.props.playing,
      "youtube-stream": this.props.source === "youtubeStream"
    });
    let img = this.props.img;
    if (this.props.source === "file") {
      img = path.join(app.getAppPath(), "images", (this.props.playing ? "light-" : "dark-") + this.props.img.replace(/^.*[\\\/]/, ""));
    }
    if (!img) {
      img = path.join(app.getAppPath(), "images", (this.props.playing ? "light-" : "dark-") + "untitled.png");
    }
    return (
      <div
        className={classNames("item", "waves-effect", "waves-block", itemClass)}
        onClick={this.handleToggle}
        ref="item"
        style={objStyle}
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
        {this.renderVideo()}
      </div>
    );
  }
});
