import React from 'react';
import { compose, prop, head, map } from 'ramda';
import { Link, Switch } from 'react-router-dom';
import { camelCase, classNames, mapRoute } from 'utils/';
import routes from 'routes/';
import './subroutes.css';

const getChildRoutes = compose(prop('routes'), head);

export default props => {
  const { location } = props;

  const key = camelCase(location.pathname);

  return (
    <div
      className={classNames('secondary-panel', { 'with-close': key !== '/' })}
    >
      {key !== '/' ? <Link className="icon-close" to="/" /> : null}

      <div className="inner">
        <Switch>
          {compose(map(mapRoute(props)), getChildRoutes)(routes)}
        </Switch>
      </div>
    </div>
  );
};
