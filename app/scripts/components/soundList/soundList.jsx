import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { SoundItem, SoundEdit } from 'components';
import './soundList.css';

class SoundList extends Component {
  static propTypes = {
    sounds: PropTypes.instanceOf(Map)
  };

  renderSound(arr) {
    return arr.map(_s => {
      let item = <SoundItem key={_s.file} sound={{ ..._s }}/>;
      if (_s.editing) {
        item = <SoundEdit key={_s.file + 'editing'} sound={{ ..._s }}/>;
      }

      return (
        <div key={_s.file}>
          <CSSTransitionGroup
            transitionEnterTimeout={450}
            transitionLeaveTimeout={450}
            transitionName="list-animation">
            {item}
          </CSSTransitionGroup>
        </div>
      );
    });
  }

  render() {
    const sounds = this.props.sounds.toArray().filter(_s => _s.progress === 1);
    return (
      <div className="container pure-g">
        <div className="pure-u-1 pure-u-sm-1-2 sound-list" ref="soundList1">
          {this.renderSound(sounds.slice(0, Math.floor(sounds.length / 2)))}
        </div>
        <div className="pure-u-1 pure-u-sm-1-2 sound-list" ref="soundList2">
          {this.renderSound(sounds.slice(Math.floor(sounds.length / 2), sounds.length))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sounds: state.sounds
});

export default connect(mapStateToProps)(SoundList);
