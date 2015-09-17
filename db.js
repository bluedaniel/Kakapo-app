// db.js
module.exports = function() {
  return {
    i18n: {
      en: require("./app/i18n/en.json"),
      fr: require("./app/i18n/fr.json")
    },
    settings: require("./app/data/settings.json"),
    sounds: require("./app/data/sounds.json"),
    theme: require("./app/data/theme.json")
  };
};
