
const testsContext = require.context('./src', true, /-test\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../app/scripts/', true, /\*\.(js|jsx)$/);
componentsContext.keys().forEach(componentsContext);
