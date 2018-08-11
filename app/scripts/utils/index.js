import path from 'path';
import fs from 'fs-extra';
import { remote, shell } from 'electron';
import {
  always,
  anyPass,
  chain,
  flatten,
  fromPairs,
  identity,
  is,
  isEmpty,
  isNil,
  keys,
  map,
  mapObjIndexed,
  merge,
  mergeAll,
  not,
  omit,
  pick,
  pipe,
  prop,
  propOr,
  reject,
  replace,
  split,
  toPairs,
  toUpper,
  trim,
  zipObj,
} from 'ramda';
import { Howler } from 'howler/dist/howler.core.min';

const defaultOptions = { prefix: '' };

export const noop = () => {};

export const safe = (fn, or = undefined) => {
  try {
    return fn();
  } catch (e) {
    return or;
  }
};

export const newSoundObj = {
  editing: false,
  file: null,
  img: null,
  link: null,
  name: null,
  playing: false,
  progress: 0,
  recentlyDownloaded: true,
  tags: null,
  source: null,
  volume: 0.5,
};

const isNilOrEmpty = anyPass([isNil, isEmpty]);

// Creates constants from `string literals`
export const createConstants = (types, opts = {}) => {
  if (
    anyPass([
      isNilOrEmpty,
      pipe(
        is(String),
        not
      ),
    ])(types)
  ) {
    throw new Error('valid types are required');
  }

  const { prefix } = merge(defaultOptions, opts);

  return pipe(
    trim,
    split(/\s/),
    map(trim),
    reject(isNilOrEmpty),
    map(x => [x, prefix ? `${toUpper(prefix)}_${x}` : x]),
    fromPairs
  )(types);
};

// Replaces switch statements with object types
export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => propOr(identity, action.type, handlers)(state, action);

const testArr = Array.from(Array(10), (_, x) => x);

// Is function FSA compliant
export const isFSA = actionFn => {
  const action = actionFn(...testArr);
  const isValidKey = key =>
    ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;

  return (
    is(Object, action) &&
    is(String, action.type) &&
    Object.keys(action).every(isValidKey)
  );
};

const RX_CAPS = /(?!^)([A-Z])/g;

// Converts a camelCaseWord into a SCREAMING_SNAKE_CASE word
export const camelToScreamingSnake = pipe(
  replace(RX_CAPS, '_$1'),
  toUpper
);

const formatMeta = obj =>
  obj.payload.meta
    ? { ...obj, payload: omit(['meta'], obj.payload), meta: obj.payload.meta }
    : obj;

const formatErr = obj =>
  obj.payload.error ? { ...obj, payload: obj.payload.error, error: true } : obj;

const formatOutput = pipe(
  formatMeta,
  formatErr
);

const getPrefix = opts => name => {
  const { prefix } = merge(defaultOptions, opts);
  return `${prefix}${camelToScreamingSnake(name)}`;
};

const actionCreator = (name, val, opts) => {
  const type = getPrefix(opts)(name);

  // testAction: pipe(pickAll(['a', 'b']), map(toUpper))
  if (is(Function, val)) {
    return (...props) => formatOutput({ type, payload: val(...props) });
  }

  // testAction: null
  if (isNil(val) || isEmpty(val)) {
    return always({ type }); // Simple action type
  }

  // testAction: ['username', 'password']
  if (is(Array, val)) {
    return (...props) =>
      formatOutput({ type, payload: { ...zipObj(val, props) } });
  }

  // testAction: { username: 'guest', password: null }
  if (is(Object, val)) {
    return props => {
      const providedProps = pick(Object.keys(val), props);
      return formatOutput({ type, payload: { ...val, ...providedProps } });
    };
  }
  throw new Error('Value must be null|array|object|function');
};

export const createActions = (config, opts = {}) => {
  if (isNil(config) || isEmpty(config)) {
    throw new Error('Must provide valid object');
  }
  const types = pipe(
    keys,
    map(getPrefix(opts)),
    map(key => ({ [key]: key }))
  )(config);
  const actions = mapObjIndexed((num, key, value) =>
    actionCreator(key, value[key], opts)
  )(config);
  return mergeAll([actions, ...types]);
};

// hyphen-name-format -> hyphenNameFormat
export const camelCase = str =>
  str.replace(
    /^([A-Z])|[\s-_](\w)/g,
    (match, p1, p2) => (p2 ? p2.toUpperCase() : p1.toLowerCase())
  );

export const toArray = x => (is(Array, x) ? x : [x]);

// { 'a':{ 'b':{ 'b2':2 }, 'c':{ 'c2':2 } } } → { 'a.b.b2':2, 'a.c.c2':2 }
const go = obj =>
  chain(([k, v]) => {
    if (is(Object, v))
      return map(([newKey, newVal]) => [`${k}.${newKey}`, newVal], go(v));
    return [[k, v]];
  }, toPairs(obj));

export const flatteni18n = pipe(
  go,
  fromPairs
);

const filterObj = obj =>
  Object.keys(obj)
    .map(curr => (obj[curr] ? curr : false))
    .filter(identity);

// cx('one', { two: true, three: false }) = 'one two'
export const cx = (...args) =>
  flatten(
    args.map(_a => {
      if (is(Array, _a)) return flatten(_a).join(' ');
      if (is(Object, _a)) return filterObj(_a);
      return _a;
    })
  ).join(' ');

// [1, [2, [3, [4]], 5]] → [1, 2, 3, 4, 5]
export const serialize = obj => {
  const encodedObj = Object.keys(obj).reduce(
    (acc, k) => [...acc, `${k}=${encodeURIComponent(obj[k])}`],
    []
  );
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

export const handleStopPropagation = e => {
  e.preventDefault();
  e.stopPropagation();
};

export const openLink = (e, link) => {
  if (__DESKTOP__) {
    handleStopPropagation(e);
    shell.openExternal(link);
  }
};

// file.mp6 -> invalid
export const validHowl = (url, msg) => {
  const codecs = prop('_codecs', Howler);
  const testCodecs = ['mp3', 'opus', 'ogg', 'wav', 'aac', 'm4a', 'mp4', 'weba'];
  const supported = codecs.length ? Object.keys(codecs) : testCodecs;
  const ext = path.extname(url).substring(1);
  const valid = supported.indexOf(ext) !== -1;
  return msg && !valid
    ? `File is ${ext}, but must be one of ${supported.join(', ')}`
    : valid;
};

// https://gist.github.com/dperini/729294
export const validUrl = str => {
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
      '$',
    'i'
  );
  return str.match(reWeburl);
};

let desktopPathConfig = {};

/* istanbul ignore if */
if (__DESKTOP__) {
  // Setup directories
  ['user-sounds', 'user-data'].forEach(_d =>
    fs.ensureDir(path.join(remote.app.getPath('userData'), _d))
  );

  desktopPathConfig = {
    // Default json objects & dirs
    gradientFile: path.join(remote.app.getAppPath(), 'data/gradients.json'),
    settingsFile: path.join(remote.app.getAppPath(), 'data/settings.json'),
    soundFile: path.join(remote.app.getAppPath(), 'data/sounds.json'),
    soundDir: path.join(remote.app.getAppPath(), 'sounds'),

    // User data & dirs
    userSoundDir: path.join(remote.app.getPath('userData'), 'user-sounds'),
    userSettingsFile: path.join(
      remote.app.getPath('userData'),
      'user-data/settings.json'
    ),
    userSoundFile: path.join(
      remote.app.getPath('userData'),
      'user-data/sounds.json'
    ),
    userThemeFile: path.join(
      remote.app.getPath('userData'),
      'user-data/theme.json'
    ),
    userInstallFile: path.join(
      remote.app.getPath('userData'),
      'user-data/app-details.json'
    ),
    tempDir: remote.app.getPath('temp'),
  };
}

export const pathConfig = desktopPathConfig;

export const swatches = type => {
  const light = ['#FFEB3B', '#FFC107', '#FF9800'];
  const dark = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
    '#001',
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

export const getProgress = (downloaded, fileSize) =>
  (downloaded / fileSize).toFixed(2);
