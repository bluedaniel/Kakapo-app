import { createActions } from 'utils/';

const prefix = 'SOUNDS_';

const actions = {
  request: null,
  requestSuccess: ['resp'],
  mute: null,
  play: ['sound'],
  throttleVolume: ['sound', 'volume'],
  volume: ['sound', 'volume'],
  edit: ['sound', 'data'],
  remove: ['sound'],
  addLocal: ['file'],
  addSound: ['service', 'data'],
  addSoundDownloading: ['sound'],
  addSoundComplete: ['sound'],
  reset: ['clear'],
  playlist: ['id'],
  createPlaylist: null,
};

export default createActions(actions, { prefix });
