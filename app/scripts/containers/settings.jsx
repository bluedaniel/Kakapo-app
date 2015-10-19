import ipc from "ipc";
import remote from "remote";
import React from "react";
import Radium from "radium";
import Reflux from "reflux";
import { Link } from "react-router";
import { IntlMixin, FormattedMessage } from "react-intl";
import { Theme, Settings } from "../stores";
import { themeActions, windowActions } from "../actions";
import { ColorPicker, Checkbox } from "../components/ui";

const app = remote.require("app");
const autoUpdater = remote.require("auto-updater");

export default new Radium(React.createClass({
  mixins: [Reflux.connect(Theme, "theme"), Reflux.connect(Settings, "settings"), IntlMixin],
  getInitialState() {
    return {
      updateStatus: false
    };
  },
  componentDidMount() {
    autoUpdater
      .on("checking-for-update", () => this.setUpdateStatus({updateStatus: "checking"}))
      .on("update-available", () => this.setUpdateStatus({updateStatus: "downloading"}))
      .on("update-not-available", () => this.setUpdateStatus({updateStatus: "latest"}))
      .on("update-downloaded", () => this.setUpdateStatus({updateStatus: "downloaded"}));
  },
  setUpdateStatus(opts) {
    this.setState(opts);
  },
  checkForUpdates() {
    if (!this.state.updateStatus) autoUpdater.checkForUpdates();
    if (this.state.updateStatus === "downloaded") ipc.send("application:quit-install");
  },
  changePaletteSlot(slotNo) {
    this.setState({ colorPickerActive: true, slotNo: slotNo, defaultColor: this.state.theme.palette[slotNo] });
  },
  changeLanguage(el) {
    windowActions.changeLanguage(el.target.value);
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
          {process.platform === "darwin" ? (
            <div className="opt">
              <Checkbox
                checked={this.state.settings.dockIcon}
                handleChange={this.toggleDockIcon}
                label="Show dock icon"
                name="toggle-dock"
                />
            </div>) : ""}
          <div className="opt quit">
            <a onClick={() => ipc.sendChannel("app-quit")}>
              <i className="icon-quit dark"/>
              Quit Kakapo
            </a>
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
            <p className="version" onClick={this.checkForUpdates}>
              {!this.state.updateStatus && `Check for update - v${app.getVersion()}`}
              {this.state.updateStatus === "checking" && "Checking for updates ..."}
              {this.state.updateStatus === "downloading" && "Downloading update ..."}
              {this.state.updateStatus === "latest" && "You have the latest version."}
              {this.state.updateStatus === "downloaded" && "Click to restart and update."}
            </p>
          </div>
        </div>
        <Link className="modal-bg" to="/"/>
      </div>
    );
  }
}));
