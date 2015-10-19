import React from "react";
import { IntlMixin } from "react-intl";
import { History } from "react-router";
import validator from "validator";
import { soundActions } from "../../actions";
import { Theme } from "../../stores";
import { toasterInstance } from "../../utils";

export default React.createClass({
  mixins: [ History, IntlMixin ],
  handleSubmit(el) {
    el.preventDefault();
    const data = {
      name: this.refs.name.value,
      url: this.refs.customInput.value
    };
    if (data.name && data.url) {
      if (validator.isURL(data.url)) {
        soundActions.getCustomURL(data.name, data.url);
        this.history.pushState(null, "/downloads");
      } else {
        toasterInstance().then(_t => _t.toast(this.getIntlMessage("import.error.url")));
      }
    } else {
      toasterInstance().then(_t => _t.toast(this.getIntlMessage("import.error.empty")));
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
              className="button-primary"
              ref="btn"
              style={Theme.styles.base.btnPrimary}
            >{this.getIntlMessage("import.save")}</button>
          </div>
        </form>
      </div>
    );
  }
});
