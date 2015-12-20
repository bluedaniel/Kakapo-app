import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export default class Media extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    const routeName = window.location.hash.substr(1).split('/').join(' ') || '';
    return (
      <CSSTransitionGroup
        component="div"
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        transitionName="modal">
        <div className={'modal ' + routeName} key={routeName}>
          {React.cloneElement(this.props.children)}
        </div>
      </CSSTransitionGroup>
    );
  }
}
