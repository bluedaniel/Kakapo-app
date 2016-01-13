import constants from 'constants';

export default {
  toggleDock: bool => ({ type: constants.SETTINGS_DOCK, bool }),
  toggleDevTools: bool => ({ type: constants.SETTINGS_DEVTOOLS, bool }),
  settingsLanguage: locale => ({ type: constants.SETTINGS_LANGUAGE, locale })
};
