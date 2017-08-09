global.fetch = require('jest-fetch-mock');

global.__WEB__ = true;
global.__DESKTOP__ = false;

// AWS mock
function DynamoDB() {
  return { getItem: () => {}, putItem: () => {} };
}
global.AWS = { DynamoDB, config: { update: () => {} } };

// jest.mock('util/getToken', () => () => 'testToken');
jest.mock('aws-custom-build', () => {});
