require('es6-promise').polyfill();

if (!global.Intl) {
  global.Intl = require('intl'); // Intl polyfill
  require('react-intl/locale-data/en');
}

const context = require.context('../app/scripts', true, /^((?!index).)*\.(js|jsx)$/);
context.keys().forEach(context);
