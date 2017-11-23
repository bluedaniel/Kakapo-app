import semver from 'semver';
import { compose, concat, filter, length } from 'ramda';
import appConfig from 'config/';

const setVersion = () => localStorage.setItem('version', appConfig.appVersion);

const initWithDefault = defaultSounds => {
  const localState = JSON.parse(localStorage.getItem('sounds'));
  const initialState = localState || [];

  if (!length(initialState)) {
    setVersion();
    return defaultSounds;
  }

  if (
    semver.lt(localStorage.getItem('version') || '0.0.1', appConfig.appVersion)
  ) {
    setVersion();
    return compose(concat(defaultSounds), filter(_s => _s.source !== 'file'))(
      initialState
    );
  }

  return initialState;
};

const saveToStorage = data =>
  localStorage.setItem('sounds', JSON.stringify(data));

export default { setVersion, initWithDefault, saveToStorage };
