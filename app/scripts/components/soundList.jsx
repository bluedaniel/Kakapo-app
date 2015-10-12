import Reflux from "reflux";
import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {Map} from "immutable";
import SoundListItem from "./soundListItem";
import SoundEditItem from "./soundEditItem";
import SoundClass from "../classes/sound";
import { Theme, Settings } from "../stores";

export default React.createClass({
  propTypes: {
    sounds: PropTypes.instanceOf(Map)
  },
  mixins: [PureRenderMixin, Reflux.connect(Settings, "settings")],
  render() {
    return (
      <div className="six columns sound-list" ref="soundList1">
        {this.props.sounds
          .toArray()
          .filter(s => s.progress === 1)
          .map(s => {
            let item = <SoundListItem key={s.file} {...s} {...this.state.settings.intlData}/>;
            if (s.editing) {
              item = <SoundEditItem key={s.file + "editing"} {...s} {...this.state.settings.intlData}/>;
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
          })}
      </div>
    );
  }
});
