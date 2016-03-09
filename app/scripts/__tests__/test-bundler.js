require('es6-promise').polyfill();

if (!global.Intl) {
  global.Intl = require('intl'); // Intl polyfill
  require('react-intl/locale-data/en');
}

// require all `*-test.jsx`
const testsContext = require.context('../', true, /-test\.(jsx|js)$/);
testsContext.keys().forEach(testsContext);
