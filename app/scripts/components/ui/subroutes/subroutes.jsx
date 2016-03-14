import React, { cloneElement } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { camelCase, omit, classNames } from 'utils/';
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
    <div className={classNames('secondary-panel', {
      'with-close': newProps.key !== '/'
    })}
    >
      {newProps.key !== '/' ? <Link className="icon-close" to="/" /> : null}
      <div className="inner">
        <CSSTransitionGroup transitionName="panel" { ...transitions }>
          {children ? cloneElement(children, newProps) : null}
        </CSSTransitionGroup>
      </div>
    </div>
  );
};
