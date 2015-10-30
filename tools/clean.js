import del from "del";
import task from "./lib/task";
import fs from "fs-extra";

export default task("clean", async () => {
  await del(["release", ".tmp", "build/*", "!build/.git"], {dot: true});
  await fs.ensureDirSync("build");
  await fs.ensureDirSync(".tmp/sounds");
  await fs.ensureDirSync(".tmp/user-data");
});
