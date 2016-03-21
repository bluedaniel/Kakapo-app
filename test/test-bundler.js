require('es6-promise').polyfill();

if (!global.Intl) {
  global.Intl = require('intl'); // Intl polyfill
  require('react-intl/locale-data/en');
}

localStorage.clear();

// require all `test/components/**/index.js`
const testsContext = require.context('./src', true, /-test\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);

// require all `src/components/**/index.js`
const componentsContext = require.context('../app/scripts/', true, /\*\.(js|jsx)$/);
componentsContext.keys().forEach(componentsContext);
