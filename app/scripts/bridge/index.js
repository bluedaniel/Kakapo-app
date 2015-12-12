import desktopSounds from './desktop/sounds';
import desktopThemes from './desktop/themes';
import desktopYoutube from './desktop/youtube';

import webSounds from './web/sounds';
import webThemes from './web/themes';
import webYoutube from './web/youtube';

const bridgedSounds = __DESKTOP__ ? desktopSounds : webSounds;
const bridgedThemes = __DESKTOP__ ? desktopThemes : webThemes;

const bridgedYoutube = __DESKTOP__ ? desktopYoutube : webYoutube;

export {
  bridgedSounds,
  bridgedThemes,
  bridgedYoutube
};
