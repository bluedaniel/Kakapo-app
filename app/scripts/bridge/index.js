import desktopSounds from './desktop/sounds';
import webSounds from './web/sounds';

export const bridgedSounds = __DESKTOP__ ? desktopSounds : webSounds;
