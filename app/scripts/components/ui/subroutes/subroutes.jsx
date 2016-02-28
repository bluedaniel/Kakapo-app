import React, { cloneElement, PropTypes } from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import color from 'color';
import { camelCase, omit } from 'utils/';

export default function Subroutes(props) {
  const { themes, children, location } = props;
  const modalTransitions = {
    component: 'div',
    transitionEnterTimeout: 500,
    transitionLeaveTimeout: 300
  };
  const newProps = {
    ...omit('children', props),
    key: camelCase(location.pathname)
  };

  return (
    <div className="container modal-transitions">

      <CSSTransitionGroup transitionName="modal" { ...modalTransitions }>
        {children ? cloneElement(children, newProps) : null}
      </CSSTransitionGroup>

      <CSSTransitionGroup transitionName="modalBg" { ...modalTransitions }>
        {children ? (<Link className="modal-bg" style={{
          background: color(themes.get('palette').first()).alpha(0.5).rgbaString() }} to="/"
        />) : null}
      </CSSTransitionGroup>

    </div>
  );
}

Subroutes.propTypes = {
  themes: PropTypes.object,
  children: PropTypes.object,
  location: PropTypes.object
};
