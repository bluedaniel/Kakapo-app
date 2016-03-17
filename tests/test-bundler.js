// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)

// Include all .js files under `app`, except app.js
// This is for isparta code coverage
const context = require.context('../app/scripts', true, /^((?!app).)*\.(js|jsx)$/);
context.keys().forEach(context);
