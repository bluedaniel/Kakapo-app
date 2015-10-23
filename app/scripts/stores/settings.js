import fs from "fs-extra";
import ipc from "ipc";
import Reflux from "reflux";
import axios from "axios";
import { windowActions } from "../actions";
import langEn from "../../i18n/en.json";
import { pathConfig } from "../utils";

export default Reflux.createStore({
  listenables: [windowActions],
  init() {
    let appSettings = fs.readFileSync(pathConfig.settingsFile);
    try {
      appSettings = fs.readFileSync(pathConfig.userSettingsFile);
    } catch (err) {
      fs.writeFile(pathConfig.userSettingsFile, appSettings);
    }
    appSettings = JSON.parse(appSettings);

    const lang = localStorage.getItem("language") || "en";
    this.opts = {
      lang: lang,
      intlData: langEn,
      dockIcon: appSettings.dockIcon
    };
    if (lang !== "en") {
      this.onChangeLanguage(lang);
    }
  },

  getInitialState() {
    return this.opts;
  },

  onChangeLanguage(lang) {
    axios.get(`http://data.kakapo.co/i18n/${lang}.json`)
      .then(response => {
        localStorage.setItem("language", lang);
        this.opts = {
          lang: lang,
          intlData: response.data
        };
        this.trigger(this.opts);
      });
  },

  onToggleDock(toggle) {
    this.opts.dockIcon = toggle;
    this.trigger(this.opts);
    const settingOpts = { dockIcon: this.opts.dockIcon };
    fs.writeFile(pathConfig.userSettingsFile, JSON.stringify(settingOpts, null, 2));
    ipc.sendChannel("toggle-dock", settingOpts.dockIcon);
  }
});
