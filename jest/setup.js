// Polyfill for fetch
const { Response, Request, Headers, fetch } = require('whatwg-fetch');

global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

global.__DESKTOP__ = false;

// jest.mock('util/getToken', () => () => 'testToken');
