import proc from "child_process";
import fs from "fs-extra";
import task from "./lib/task";

const indexFile = process.env.NODE_ENV === "development" ? "index-dev" : "index";

export default task("copy", async () => {
  await Promise.all([
    proc.execSync("babel app/browser.js --out-file build/browser.js"),
    fs.copySync("package.json", "build/package.json"),
    fs.copySync("app/html/loading.css", "build/loading.css"),
    fs.copySync(`app/html/${indexFile}.html`, "build/index.html"),
    ["sounds", "data", "fonts", "icons", "images"].map(_f =>
      fs.copySync(`app/${_f}`, `build/${_f}`))
  ]);
});
