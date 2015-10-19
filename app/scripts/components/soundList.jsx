import Reflux from "reflux";
import React, { PropTypes } from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {Map} from "immutable";
import SoundListItem from "./soundListItem";
import SoundEditItem from "./soundEditItem";
import { Settings } from "../stores";

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
          .filter(_s => _s.progress === 1)
          .map(_s => {
            let item = <SoundListItem key={_s.file} {..._s} {...this.state.settings.intlData}/>;
            if (_s.editing) {
              item = <SoundEditItem key={_s.file + "editing"} {..._s} {...this.state.settings.intlData}/>;
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
          })}
      </div>
    );
  }
});
