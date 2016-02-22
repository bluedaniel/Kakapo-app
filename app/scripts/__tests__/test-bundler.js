require('es6-promise').polyfill();

if (!global.Intl) {
  global.Intl = require('intl'); // Intl polyfill
}

// require all `*-test.jsx`
const testsContext = require.context('../', true, /-test\.(jsx|js)$/);
testsContext.keys().forEach(testsContext);

// require all `js|jsx` except for `__tests__` & `./index.jsx` (for isparta coverage reporting)
const componentsContext =
  require.context('../', true, /^((?!([\\/]__tests__[\\/])|index).)*\.(js|jsx)$/);
componentsContext.keys().forEach(componentsContext);
