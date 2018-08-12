import React from 'react';
import { pick } from 'ramda';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { IntlProvider } from 'react-intl';
import App from 'containers/app/app';

const Root = ({ settings: { intlData }, history }) => (
  <IntlProvider locale={intlData.id} messages={intlData.messages}>
    <ConnectedRouter {...{ history }}>
      <App />
    </ConnectedRouter>
  </IntlProvider>
);

const mapStateToProps = pick(['settings']);

export default connect(mapStateToProps)(Root);
