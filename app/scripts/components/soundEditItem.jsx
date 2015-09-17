import React from "react";
import Radium from "radium";
import Ladda from "ladda";
import { FormattedMessage, IntlMixin } from "react-intl";
import { soundActions } from "../actions";
import { Theme } from "../stores";
import SoundClass from "../classes/sound";

export default new Radium(React.createClass({
  propTypes: SoundClass,
  mixins: [ IntlMixin ],
  handleCancel(e) {
    e.preventDefault();
    soundActions.editSound(this.props, null);
  },
  handleSave(e) {
    e.preventDefault();
    Ladda.create(this.refs.btn).start();
    var newData = {
      name: this.refs.name.value,
      tags: this.refs.tags.value
    };
    soundActions.editSound(this.props, newData);
  },
  render() {
    return (
      <div className="item editing" style={[Theme.styles.soundList.item]}>
        <form onSubmit={this.handleSave}>
          <label><FormattedMessage message={this.getIntlMessage("list.editing_name")}/></label>
          <input
            className="u-full-width"
            defaultValue={this.props.name}
            placeholder={this.getIntlMessage("list.editing_name_placeholder")}
            ref="name"
            type="text"
          />
          <label><FormattedMessage message={this.getIntlMessage("list.editing_tag")}/></label>
          <input
            className="u-full-width"
            defaultValue={this.props.tags}
            placeholder={this.getIntlMessage("list.editing_tag_placeholder")}
            ref="tags"
            type="text"
          />
          <a className="button" onClick={this.handleCancel} style={Theme.styles.base.btn}>
            <FormattedMessage message={this.getIntlMessage("list.cancel")}/>
          </a>
          <button
            className="button-primary ladda-button"
            data-style="expand-right"
            ref="btn"
            style={Theme.styles.base.btnPrimary}
          >
            <span className="ladda-label">
              <FormattedMessage message={this.getIntlMessage("list.save")}/>
            </span>
          </button>
        </form>
      </div>
    );
  }
}));
