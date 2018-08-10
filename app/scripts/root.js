import React from 'react';
import { pick, map } from 'ramda';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { IntlProvider } from 'react-intl';
import { mapRoute } from 'utils/';
import routes from 'routes/';

const Root = ({ settings, history }) => (
  <IntlProvider
    locale={settings.intlData.id}
    messages={settings.intlData.messages}
  >
    <ConnectedRouter {...{ history }}>
      <div>{map(mapRoute(), routes)}</div>
    </ConnectedRouter>
  </IntlProvider>
);

const mapStateToProps = pick(['settings']);

export default connect(mapStateToProps)(Root);
