import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    request: null,
    requestSuccess: ['resp'],
    mute: null,
    play: ['sound'],
    volume: ['sound', 'volume'],
    edit: ['sound', 'data'],
    remove: ['sound'],
    addLocal: ['file'],
    addSound: ['service', 'data'],
    addSoundDownloading: ['sound'],
    addSoundComplete: ['sound'],
    addSoundError: ['err'],
    reset: ['clear']
  },
  { prefix: 'SOUNDS_' }
);
