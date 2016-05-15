const testsContext = require.context('./src', true, /-test\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);
