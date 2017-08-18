import semver from 'semver';
import { compose, concat, filter, length } from 'ramda';
import packageJson from '../../../../package.json';

export default {
  setVersion() {
    localStorage.setItem('version', packageJson.version);
  },
  initWithDefault(defaultSounds) {
    const localState = JSON.parse(localStorage.getItem('sounds'));
    const initialState = localState || [];

    if (!length(initialState)) {
      this.setVersion();
      return defaultSounds;
    }

    if (
      semver.lt(localStorage.getItem('version') || '0.0.1', packageJson.version)
    ) {
      this.setVersion();
      return compose(concat(defaultSounds), filter(_s => _s.source !== 'file'))(
        initialState
      );
    }

    return initialState;
  },
  saveToStorage(json) {
    localStorage.setItem('sounds', json);
  }
};
