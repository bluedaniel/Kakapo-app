import path from "path";
import fs from "fs-extra";
import dirname from "./dirname";

const resolvePath = dir => path.join(dirname, dir);

// Setup directories
["sounds", "user-data"].forEach(_d => fs.ensureDir(resolvePath(`../.tmp/${_d}`)));

export default {
  // Default json objects
  settingsFile: resolvePath("/data/settings.json"),
  soundFile: resolvePath("/data/sounds.json"),

  // User data directories
  soundDir: resolvePath("../.tmp/sounds"),

  // User data json objects
  userSettingsFile: resolvePath("../.tmp/user-data/settings.json"),
  userSoundFile: resolvePath("../.tmp/user-data/sounds.json")
};
