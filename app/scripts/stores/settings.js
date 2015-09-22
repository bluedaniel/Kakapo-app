import path from "path";
import fs from "fs";
import ipc from "ipc";
import Reflux from "reflux";
import axios from "axios";
import { windowActions } from "../actions";
import langEn from "../../i18n/en.json";
import { dirname } from "../utils";

function setSettingsFile(opts) {
  let settingsOpts = {
    dockIcon: opts.dockIcon
  };
  fs.writeFile(path.join(dirname, "/data/settings.json"), JSON.stringify(settingsOpts, null, 2));
  ipc.sendChannel("toggle-dock", opts.dockIcon);
}

export default Reflux.createStore({
  listenables: [windowActions],
  init() {
    let appSettings = JSON.parse(fs.readFileSync(path.join(dirname, "/data/settings.json")));
    let lang = localStorage.getItem("language") || "en";
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
      }.bind(this))
      .catch(response => console.error("Failed!", response));
  },
  onToggleDock(toggle) {
    this.opts.dockIcon = toggle;
    this.trigger(this.opts);
    setSettingsFile(this.opts);
  }
});
