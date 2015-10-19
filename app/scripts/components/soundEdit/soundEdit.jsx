import React from "react";
import { FormattedMessage, IntlMixin } from "react-intl";
import { soundActions } from "../../actions";
import { Theme } from "../../stores";
import SoundClass from "../../classes/sound";

export default React.createClass({
  propTypes: SoundClass,
  mixins: [ IntlMixin ],
  handleCancel(el) {
    el.preventDefault();
    soundActions.editSound(this.props, null);
  },
  handleSave(el) {
    el.preventDefault();
    soundActions.editSound(this.props, {
      name: this.refs.name.value,
      tags: this.refs.tags.value
    });
  },
  render() {
    return (
      <div className="item editing" style={Theme.styles.soundList.item}>
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
            className="button-primary"
            style={Theme.styles.base.btnPrimary}
          ><FormattedMessage message={this.getIntlMessage("list.save")}/></button>
        </form>
      </div>
    );
  }
});
