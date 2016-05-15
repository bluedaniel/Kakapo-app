const JsDom = require('jsdom');

global.document = JsDom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.localStorage = typeof localStorage !== 'undefined' && localStorage ?
  localStorage : {
    _data: {},
    setItem: (id, val) => (localStorage._data[id] = String(val)),
    getItem: id => localStorage._data.hasOwnProperty(id) ? localStorage._data[id] : undefined,
    removeItem: id => delete localStorage._data[id],
    clear: () => (localStorage._data = {})
  };

require('../.tmp/test.bundle.js');
