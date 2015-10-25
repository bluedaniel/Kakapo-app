// import path from "path";
import task from "./lib/task";
import copy from "./lib/copy";
import proc from "child_process";
import fs from "fs-extra";

// import watch from "./lib/watch";
const indexFile = process.env.NODE_ENV === "development" ? "index-dev" : "index";

export default task("copy", async () => {
  await Promise.all([
    proc.execSync("babel app/browser.js --out-file build/browser.js"),
    fs.copySync("package.json", "build/package.json"),
    fs.copySync("app/html/loading.css", "build/loading.css"),
    fs.copySync(`app/html/${indexFile}.html`, "build/index.html"),
    copy("app/sounds", "build/sounds"),
    copy("app/data", "build/data"),
    copy("app/fonts", "build/fonts"),
    copy("app/icons", "build/icons"),
    copy("app/images", "build/images")
  ]);

  // if (global.WATCH) {
  //   const watcher = await watch("src/content/**/*.*");
  //   watcher.on("changed", async (file) => {
  //     const relPath = file.substr(path.join(__dirname, "../src/content/").length);
  //     await copy(`src/content/${relPath}`, `build/content/${relPath}`);
  //   });
  // }
});
