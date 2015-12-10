import { Map } from 'immutable';
import semver from 'semver';
import packageJson from '../../../../package.json';

const actions = {
  setVersion() {
    localStorage.setItem('version', packageJson.version);
  },
  initWithDefault(defaultSounds) {
    let initialState = new Map(JSON.parse(localStorage.getItem('sounds')));

    if (!initialState.size) {
      this.setVersion();
      return defaultSounds;
    }

    if (semver.lt(localStorage.getItem('version') || '0.0.1', packageJson.version)) {
      this.setVersion();
      initialState = initialState.filterNot(_s => _s.source === 'file').toArray().concat(defaultSounds);
    }

    return initialState;
  },
  saveToStorage(json) {
    localStorage.setItem('sounds', json);
  }
};

export default actions;
