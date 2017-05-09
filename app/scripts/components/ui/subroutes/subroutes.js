import React, { cloneElement } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { camelCase, compose, omit, merge, classNames } from 'utils/';
import './subroutes.css';

export default props => {
  const { children, location } = props;

  const transitions = {
    component: 'div',
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 300
  };

  const key = camelCase(location.pathname);
  const newProps = compose(merge({ key }), omit('children'))(props);

  return (
    <div
      className={classNames('secondary-panel', { 'with-close': key !== '/' })}
    >
      {key !== '/' ? <Link className="icon-close" to="/" /> : null}
      <div className="inner">
        <CSSTransitionGroup transitionName="panel" {...transitions}>
          {children ? cloneElement(children, newProps) : null}
        </CSSTransitionGroup>
      </div>
    </div>
  );
};
