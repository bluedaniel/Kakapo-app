require('es6-promise').polyfill();

if (!global.Intl) {
  global.Intl = require('intl'); // Intl polyfill
  require('intl/locale-data/jsonp/en.js');
}

// require all `*-test.jsx`
const testsContext = require.context('../', true, /-test\.(jsx|js)$/);
testsContext.keys().forEach(testsContext);
