import semver from 'semver';
import { compose, concat, filter, length } from 'ramda';

const setVersion = () =>
  localStorage.setItem('version', process.env.npm_package_version);

const initWithDefault = defaultSounds => {
  const localState = JSON.parse(localStorage.getItem('sounds'));
  const initialState = localState || [];

  if (!length(initialState)) {
    setVersion();
    return defaultSounds;
  }

  if (
    semver.lt(
      localStorage.getItem('version') || '0.0.1',
      process.env.npm_package_version
    )
  ) {
    setVersion();
    return compose(concat(defaultSounds), filter(_s => _s.source !== 'file'))(
      initialState
    );
  }

  return initialState;
};

const saveToStorage = json => localStorage.setItem('sounds', json);

export default { setVersion, initWithDefault, saveToStorage };
