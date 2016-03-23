require('es6-promise').polyfill();
require('./polyfills/array-from');

if (!global.Intl) {
  global.Intl = require('intl');
  require('intl/locale-data/jsonp/en');
}

localStorage.clear();

const testsContext = require.context('./src', true, /-test\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../app/scripts/', true, /\*\.(js|jsx)$/);
componentsContext.keys().forEach(componentsContext);
