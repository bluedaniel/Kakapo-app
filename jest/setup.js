import raf from 'raf';
import fetchMock from 'jest-fetch-mock';
import soundcloudMock from '../__mocks__/soundcloud.json';

const noop = () => {};

global.fetch = fetchMock;
global.__WEB__ = true;
global.__DESKTOP__ = false;

// Mock for JSDOM not supporting HTMLMediaElement
window.HTMLMediaElement.prototype.load = noop;
window.HTMLMediaElement.prototype.play = noop;
window.HTMLMediaElement.prototype.pause = noop;
window.HTMLMediaElement.prototype.addTextTrack = noop;

// AWS Custom build mock
jest.mock('aws-custom-build', noop);

// AWS DynamoDB mock
function DynamoDB() {
  return { getItem: noop, putItem: noop };
}
global.AWS = { DynamoDB, config: { update: noop } };

// Soundcloud mock
global.SC = {
  initialize: noop,
  get: (name, obj, cb) => cb(soundcloudMock),
};

raf.polyfill(global);
