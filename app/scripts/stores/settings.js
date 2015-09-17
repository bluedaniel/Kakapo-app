import Reflux from "reflux";
import axios from "axios";
import { windowActions } from "../actions";
import langEn from "../../i18n/en.json";

export default Reflux.createStore({
  listenables: [windowActions],
  init() {
    let lang = localStorage.getItem("language") || "en";
    this.opts = {
      lang: lang,
      intlData: langEn
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
  }
});
