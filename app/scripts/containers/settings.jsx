import ipc from "ipc";
import React from "react";
import Radium from "radium";
import Reflux from "reflux";
import { Link } from "react-router";
import { IntlMixin, FormattedMessage } from "react-intl";
import { Theme, Settings } from "../stores";
import { themeActions, windowActions } from "../actions";
import { ColorPicker, Checkbox } from "../components/ui";

export default new Radium(React.createClass({
  mixins: [Reflux.connect(Theme, "theme"), Reflux.connect(Settings, "settings"), IntlMixin],
  changePaletteSlot(slotNo) {
    this.setState({ colorPickerActive: true, slotNo: slotNo, defaultColor: this.state.theme.palette[slotNo] });
  },
  changeLanguage(e) {
    windowActions.changeLanguage(e.target.value);
  },
  handleSwatch(swatch) {
    this.setState({ colorPickerActive: false });
    themeActions.changePaletteColor(swatch, this.state.slotNo);
  },
  toggleDockIcon(value) {
    windowActions.toggleDock(value);
  },
  render() {
    return (
      <div>
        <div className="modal settings-pane">
          <Link className="close" to="/">{this.getIntlMessage("modal.close")}</Link>
          <h5><FormattedMessage message={this.getIntlMessage("settings.header")}/></h5>
          <div className="opt">
            <FormattedMessage message={this.getIntlMessage("settings.theme")} />
            <span className="swatches">
              <a onClick={() => this.changePaletteSlot(0)} style={{backgroundColor: this.state.theme.palette[0]}}></a>
              <a onClick={() => this.changePaletteSlot(1)} style={{backgroundColor: this.state.theme.palette[1]}}></a>
            </span>
            <ColorPicker
              active={this.state.colorPickerActive}
              color={this.state.defaultColor}
              handleSwatch={this.handleSwatch}
              />
          </div>
          <div className="opt">
            <Checkbox
              checked={this.state.settings.dockIcon}
              handleChange={this.toggleDockIcon}
              label="Show dock icon"
              name="toggle-dock"
              />
          </div>
          <div className="opt">
            <a
              className="github hint--right"
              data-hint="Fork me on Github!"
              href="https://github.com/bluedaniel/kakapo-web"
              target="_blank"
            >
              <i className="icon-github"/>
            </a>
          </div>
          <div className="opt quit">
            <a onClick={() => ipc.sendChannel("app-quit")}>
              <i className="icon-quit dark"/>
              Quit Kakapo
            </a>
          </div>
        </div>
        <Link className="modal-bg" to="/"/>
      </div>
    );
  }
}));
