import React from 'react';
import { map } from 'ramda';
import { ConnectedRouter } from 'react-router-redux';
import { IntlProvider } from 'react-intl';
import { mapRoute } from 'utils/';
import routes from 'routes/';

export default ({ state, history }) =>
  <IntlProvider
    locale={state.settings.intlData.id}
    messages={state.settings.intlData.messages}
  >
    <ConnectedRouter {...{ history }}>
      <div>
        {map(mapRoute(), routes)}
      </div>
    </ConnectedRouter>
  </IntlProvider>;
