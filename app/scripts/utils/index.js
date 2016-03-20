import path from 'path';
import fs from 'fs-extra';
import { remote } from 'electron';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/windowCount';
import { Howler } from 'howler';
export { default as toasterInstance } from './toaster';

export const createConstants = (...constants) => constants.reduce((acc, constant) =>
  ({ ...acc, [constant]: constant }), {});

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

// hyphen-name-format -> hyphenNameFormat
export const camelCase = str => str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase());

export const toArray = x => Array.isArray(x) ? x : [ x ];

// (['a'], {a: 1, b: 2, c: 3}) -> {a: 1}
export const pluck = (props, x) => toArray(props).reduce((acc, prop) => {
  if (typeof x[prop] !== 'undefined') acc[prop] = x[prop];
  return acc;
}, {});

// (['a', 'd'], {a: 1, b: 2, c: 3, d: 4}) -> {b: 2, c: 3}
export const omit = (props, x) => pluck(Object.keys(x).filter(k =>
  typeof toArray(props).filter(p => p === k)[0] === 'undefined'), x);

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
  const encodedObj = Object.keys(obj).reduce((acc, k) =>
    ([ ...acc, `${k}=${encodeURIComponent(obj[k])}` ]), []);
  return `?${encodedObj.join('&')}`;
};

export const throttle = (func, ms = 50, context = window) => {
  let wait = false;
  return (...args) => {
    const later = () => func.apply(context, args);
    if (!wait) {
      later();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, ms);
    }
  };
};

// Konami keycode
export const Konami = () => Observable.fromEvent(window, 'keyup')
  .map(el => el.keyCode)
  .windowWithCount(10, 1)
  .mergeMap(_x => _x.toArray())
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

// https://gist.github.com/dperini/729294
export const validUrl = (str) => {
  const reWeburl = new RegExp(
    '^' +
      // protocol identifier (optional) + //
      '(?:(?:https?:)?//)?' +
      // user:pass authentication (optional)
      '(?:\\S+(?::\\S*)?@)?' +
      // host (optional) + domain + tld
      '(?:(?!-)[-a-z0-9\\u00a1-\\uffff]*[a-z0-9\\u00a1-\\uffff]+(?!./|\\.$)\\.?){2,}' +
      // server port number (optional)
      '(?::\\d{2,5})?' +
      // resource path (optional)
      '(?:/\\S*)?' +
    '$', 'i'
  );
  return str.match(reWeburl);
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
    userInstallFile: path.join(app.getPath('userData'), 'user-data/app-details.json'),
    tempDir: app.getPath('temp')
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
