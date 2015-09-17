import React from "react";
import Radium from "radium";
import Ladda from "ladda";
import { IntlMixin } from "react-intl";
import { History } from "react-router";
import validator from "validator";
import { soundActions } from "../../actions";
import { Theme } from "../../stores";
import { toasterInstance } from "../../utils";

export default new Radium(React.createClass({
  mixins: [ History, IntlMixin ],
  handleSubmit(e) {
    e.preventDefault();
    var data = {
      name: this.refs.name.value,
      url: this.refs.customInput.value
    };
    if (data.name && data.url) {
      if (validator.isURL(data.url)) {
        Ladda.create(this.refs.btn).start();
        soundActions.getCustomURL(data.name, data.url);
        this.history.pushState(null, "/downloads");
      } else {
        toasterInstance().then(t => t.toast(this.getIntlMessage("import.error.url")));
      }
    } else {
      toasterInstance().then(t => t.toast(this.getIntlMessage("import.error.empty")));
    }
  },
  render() {
    return (
      <div>
        <h5>{this.getIntlMessage("import.custom.header")}</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="row media-import">
            <input
              className="u-full-width"
              placeholder={this.getIntlMessage("import.custom.name_placeholder")}
              ref="name"
              type="text"
            />
            <input
              className="u-full-width"
              placeholder={this.getIntlMessage("import.custom.url_placeholder")}
              ref="customInput"
              type="text"
            />
            <button
              className="button-primary ladda-button"
              data-style="expand-right"
              ref="btn"
              style={Theme.styles.base.btnPrimary}
            >
              <span className="ladda-label">{this.getIntlMessage("import.save")}</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}));
