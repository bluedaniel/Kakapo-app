import React from 'react';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import routes from 'routes/';

export default ({ state, appHistory }) => (
  <IntlProvider
    locale={state.settings.intlData.id}
    messages={state.settings.intlData.messages}
  >
    <Router history={appHistory} routes={routes} />
  </IntlProvider>
);
