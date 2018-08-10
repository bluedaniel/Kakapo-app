import React from 'react';
import { compose, head, map, path, prop } from 'ramda';
import { Link, Switch } from 'react-router-dom';
import { camelCase, cx, mapRoute } from 'utils/';
import routes from 'routes/';
import './subroutes.css';

const getChildRoutes = compose(
  prop('routes'),
  head
);

const getKey = compose(
  camelCase,
  path(['router', 'location', 'pathname'])
);

export default props => (
  <div
    className={cx('secondary-panel', {
      'with-close': getKey(props) !== '/',
    })}
  >
    {getKey(props) !== '/' ? <Link className="icon-close" to="/" /> : null}

    <div className="inner">
      <Switch>
        {compose(
          map(mapRoute(props)),
          getChildRoutes
        )(routes)}
      </Switch>
    </div>
  </div>
);
