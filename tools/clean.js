import del from "del";
import task from "./lib/task";
import fs from "./lib/fs";

export default task("clean", async () => {
  await del(["release", ".tmp", "build/*", "!build/.git"], {dot: true});
  await fs.makeDir("build");
  await fs.makeDir(".tmp/sounds");
  await fs.makeDir(".tmp/user-data");
});
