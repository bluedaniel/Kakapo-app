import React, { cloneElement } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { camelCase, omit } from 'utils/';
import './subroutes.css';

export default (props) => {
  const { children, location } = props;
  const transitions = {
    component: 'div',
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 300
  };
  const newProps = {
    ...omit('children', props),
    key: camelCase(location.pathname)
  };

  return (
    <div className="secondary-panel">
      <div className="inner">
        <CSSTransitionGroup transitionName="panel" { ...transitions }>
          {children ? cloneElement(children, newProps) : null}
        </CSSTransitionGroup>
      </div>
    </div>
  );
};
