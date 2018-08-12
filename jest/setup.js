import raf from 'raf';
import fetchMock from 'jest-fetch-mock';
import soundcloudMock from '../__mocks__/soundcloud.json';

global.fetch = fetchMock;
global.__WEB__ = true;
global.__DESKTOP__ = false;

// Mock for JSDOM not supporting HTMLMediaElement
window.HTMLMediaElement.prototype.load = () => {};
window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.addTextTrack = () => {};

// AWS Custom build mock
jest.mock('aws-custom-build', () => {});

// AWS DynamoDB mock
function DynamoDB() {
  return { getItem: () => {}, putItem: () => {} };
}
global.AWS = { DynamoDB, config: { update: () => {} } };

// Soundcloud mock
global.SC = {
  initialize: () => {},
  get: (name, obj, cb) => cb(soundcloudMock),
};

raf.polyfill(global);
