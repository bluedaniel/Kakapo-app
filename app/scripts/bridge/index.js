import desktopSounds from './desktop/sounds';
import desktopThemes from './desktop/themes';

import webSounds from './web/sounds';
import webThemes from './web/themes';

const bridgedSounds = __DESKTOP__ ? desktopSounds : webSounds;
const bridgedThemes = __DESKTOP__ ? desktopThemes : webThemes;

export {
  bridgedSounds,
  bridgedThemes
};
