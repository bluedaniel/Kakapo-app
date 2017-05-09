import { Map } from 'immutable';
import semver from 'semver';
import packageJson from '../../../../package.json';

export default {
  setVersion() {
    localStorage.setItem('version', packageJson.version);
  },
  initWithDefault(defaultSounds) {
    const localState = JSON.parse(localStorage.getItem('sounds'));
    const initialState = localState ? new Map(localState) : new Map();

    if (!initialState.size) {
      this.setVersion();
      return defaultSounds;
    }

    if (
      semver.lt(localStorage.getItem('version') || '0.0.1', packageJson.version)
    ) {
      this.setVersion();
      return initialState
        .filterNot(_s => _s.source === 'file')
        .toArray()
        .concat(defaultSounds);
    }

    return initialState;
  },
  saveToStorage(json) {
    localStorage.setItem('sounds', json);
  }
};
