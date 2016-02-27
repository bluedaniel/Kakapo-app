import path from 'path';
import fs from 'fs-extra';
import { remote } from 'electron';
import Rx from 'rx';
import { Howler } from 'howler';
export { default as toasterInstance } from './toaster';

export const createConstants = (...constants) => constants.reduce((acc, constant) => {
  acc[constant] = constant;
  return acc;
}, {});

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

// [1, [2, [3, [4]], 5]] → [1, 2, 3, 4, 5]
export const flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;

// { 'a':{ 'b':{ 'b2':2 }, 'c':{ 'c2':2 } } } → { 'a.b.b2':2, 'a.c.c2':2 }
export const flatteni18n = obj => Object.keys(obj).reduce((_r, _k) => {
  if (typeof obj[_k] === 'object') {
    const flatObj = flatteni18n(obj[_k]);
    Object.keys(flatObj).map(_f => {
      _r[_f ? `${_k}.${_f}` : _k] = flatObj[_f];
      return _f;
    });
  } else {
    _r[_k] = obj[_k];
  }
  return _r;
}, {});

const filterObj = obj => Object.keys(obj).map(_k => obj[_k] ? _k : false).filter(_v => _v);

// classNames('one', { two: true, three: false }) = 'one two'
export const classNames = (...args) => flatten(args.map(_a => {
  if (Array.isArray(_a)) return flatten(_a).join(' ');
  if (typeof _a === 'object') return filterObj(_a);
  return _a;
})).join(' ');

// [1, [2, [3, [4]], 5]] → [1, 2, 3, 4, 5]
export const serialize = obj => {
  const encodedObj = Object.keys(obj).reduce((a, k) => {
    a.push(`${k}=${encodeURIComponent(obj[k])}`);
    return a;
  }, []);
  return `?${encodedObj.join('&')}`;
};

// Konami keycode
export const Konami = () => Rx.Observable.fromEvent(window, 'keyup')
  .map(el => el.keyCode)
  .windowWithCount(10, 1)
  .selectMany(_x => _x.toArray())
  .filter(seq => seq.toString() === [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ].toString());

// file.mp6 -> invalid
export const validHowl = (url, msg) => {
  const codecs = Howler._codecs;
  const testCodecs = [ 'mp3', 'opus', 'ogg', 'wav', 'aac', 'm4a', 'mp4', 'weba' ];
  const supported = codecs.length ? Object.keys(codecs) : testCodecs;
  const ext = path.extname(url).substring(1);
  const valid = supported.indexOf(ext) !== -1;
  return msg && !valid ? `File is ${ext}, but must be one of ${supported.join(', ')}` : valid;
};

let desktopPathConfig = {};

/* istanbul ignore if */
if (__DESKTOP__) {
  const app = remote.app;

  // Setup directories
  [ 'user-sounds', 'user-data' ].forEach(_d =>
    fs.ensureDir(path.join(app.getPath('userData'), _d)));

  desktopPathConfig = {
    // Default json objects & dirs
    gradientFile: path.join(app.getAppPath(), 'data/gradients.json'),
    settingsFile: path.join(app.getAppPath(), 'data/settings.json'),
    soundFile: path.join(app.getAppPath(), 'data/sounds.json'),
    soundDir: path.join(app.getAppPath(), 'sounds'),

    // User data & dirs
    userSoundDir: path.join(app.getPath('userData'), 'user-sounds'),
    userSettingsFile: path.join(app.getPath('userData'), 'user-data/settings.json'),
    userSoundFile: path.join(app.getPath('userData'), 'user-data/sounds.json'),
    userThemeFile: path.join(app.getPath('userData'), 'user-data/theme.json'),
    userInstallFile: path.join(app.getPath('userData'), 'user-data/app-details.json')
  };
}

export const pathConfig = desktopPathConfig;

export const swatches = (type) => {
  const light = [
    '#FFEB3B', '#FFC107', '#FF9800'
  ];
  const dark = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#001'
  ];
  switch (type) {
    case 'light':
      return light;
    case 'dark':
      return dark;
    default:
      return light.concat(dark);
  }
};
