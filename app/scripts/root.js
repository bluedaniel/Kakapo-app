import React from 'react';
import { map } from 'ramda';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import routes from 'routes/';

const mapRoutes = map(route =>
  <Route
    key={route.path}
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

export default ({ state, history }) =>
  <IntlProvider
    locale={state.settings.intlData.id}
    messages={state.settings.intlData.messages}
  >
    <ConnectedRouter {...{ history }}>
      <div>
        {mapRoutes(routes)}
      </div>
    </ConnectedRouter>
  </IntlProvider>;
