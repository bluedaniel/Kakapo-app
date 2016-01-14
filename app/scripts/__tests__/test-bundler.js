// require all `*-test.jsx`
const testsContext = require.context('../../', true, /-test\.(jsx|js)$/);
testsContext.keys().forEach(testsContext);

// require all `src/**/*.js` except for `browser.js` (for isparta coverage reporting)
const componentsContext = require.context('../', true, /-test\.(jsx|js)$/);
componentsContext.keys().forEach(componentsContext);
