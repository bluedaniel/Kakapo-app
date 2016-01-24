if (!global.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js'
  ], function (require) {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
  });
}

// require all `*-test.jsx`
const testsContext = require.context('../', true, /-test\.(jsx|js)$/);
testsContext.keys().forEach(testsContext);

// require all `js|jsx` except for `__tests__` & `./index.jsx` (for isparta coverage reporting)
const componentsContext = require.context('../', true, /^((?!([\\/]__tests__[\\/])|index).)*\.(js|jsx)$/);
componentsContext.keys().forEach(componentsContext);
