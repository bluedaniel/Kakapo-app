import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
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
    reset: ['clear']
  },
  { prefix: 'SOUNDS_' }
);
