import desktopSounds from './desktop/sounds';
import desktopThemes from './desktop/themes';
import desktopSettings from './desktop/settings';
import desktopYoutube from './desktop/youtube';

import webSounds from './web/sounds';
import webThemes from './web/themes';
import webSettings from './web/settings';
import webYoutube from './web/youtube';

const bridgedSounds = __DESKTOP__ ? desktopSounds : webSounds;
const bridgedThemes = __DESKTOP__ ? desktopThemes : webThemes;
const bridgedSettings = __DESKTOP__ ? desktopSettings : webSettings;

const bridgedYoutube = __DESKTOP__ ? desktopYoutube : webYoutube;

export {
  bridgedSounds,
  bridgedThemes,
  bridgedYoutube,
  bridgedSettings
};
