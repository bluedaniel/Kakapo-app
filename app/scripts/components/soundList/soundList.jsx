import Reflux from "reflux";
import {Map} from "immutable";
import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {SoundItem, SoundEdit} from "../";
import { Settings } from "../../stores";
import "./soundList.css";

export default React.createClass({
  propTypes: {
    sounds: PropTypes.instanceOf(Map)
  },
  mixins: [PureRenderMixin, Reflux.connect(Settings, "settings")],
  renderSound(arr) {
    return arr
      .toArray()
      .filter(_s => _s.progress === 1)
      .map(_s => {
        let item = <SoundItem key={_s.file} {..._s} {...this.state.settings.intlData}/>;
        if (_s.editing) {
          item = <SoundEdit key={_s.file + "editing"} {..._s} {...this.state.settings.intlData}/>;
        }
        return (
          <div key={_s.file}>
            <CSSTransitionGroup
              transitionEnterTimeout={450}
              transitionLeaveTimeout={450}
              transitionName="list-animation">
              {item}
            </CSSTransitionGroup>
          </div>);
      });
  },
  render() {
    const sounds = this.props.sounds;
    const half = Math.floor(sounds.count() / 2);
    return (
      <div className="row">
        <div className="six columns sound-list" ref="soundList1">
          {this.renderSound(sounds.slice(0, half))}
        </div>
        <div className="six columns sound-list" ref="soundList2">
          {this.renderSound(sounds.slice(half, sounds.count()))}
        </div>
      </div>
    );
  }
});
