import path from "path";
import remote from "remote";
import fs from "fs-extra";

const app = remote.require("app");

// Setup directories
["user-sounds", "user-data"].forEach(_d => fs.ensureDir(path.join(app.getPath("userData"), _d)));

export default {
  // Default json objects & dirs
  gradientFile: path.join(app.getAppPath(), "data/gradients.json"),
  settingsFile: path.join(app.getAppPath(), "data/settings.json"),
  soundFile: path.join(app.getAppPath(), "data/sounds.json"),
  soundDir: path.join(app.getAppPath(), "sounds"),

  // User data & dirs
  userSoundDir: path.join(app.getPath("userData"), "user-sounds"),
  userSettingsFile: path.join(app.getPath("userData"), "user-data/settings.json"),
  userSoundFile: path.join(app.getPath("userData"), "user-data/sounds.json"),
  userInstallFile: path.join(app.getPath("userData"), "user-data/app-details.json")
};
