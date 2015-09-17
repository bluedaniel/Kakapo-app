import Reflux from "reflux";
import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";
import PureRenderMixin from "react-addons-pure-render-mixin";
import SoundListItem from "./soundListItem";
import SoundEditItem from "./soundEditItem";
import SoundClass from "../classes/sound";
import { Theme, Settings } from "../stores";

export default React.createClass({
  propTypes: {
    sounds: PropTypes.arrayOf(PropTypes.shape(SoundClass))
  },
  mixins: [PureRenderMixin, Reflux.connect(Settings, "settings")],
  renderSound(arr) {
    return arr
      .filter(s => s.progress === 1)
      .map(s => {
        let item = <SoundListItem key={s.file + "editing"} {...s} {...this.state.settings.intlData}/>;
        if (s.editing) {
          item = <SoundEditItem key={s.file} {...s} {...this.state.settings.intlData}/>;
        }
        return (
          <div key={s.file}>
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
    let sounds = this.props.sounds;
    let half = Math.floor(sounds.length / 2);
    return (
      <div className="row">
        <div className="six columns sound-list" ref="soundList1">
          {this.renderSound(sounds.slice(0, half))}
        </div>
        <div className="six columns sound-list" ref="soundList2">
          {this.renderSound(sounds.slice(half, sounds.length))}
        </div>
      </div>
    );
  }
});
