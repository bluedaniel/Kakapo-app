// import path from "path";
import task from "./lib/task";
import copy from "./lib/copy";

// import watch from "./lib/watch";

export default task("copy", async () => {
  await Promise.all([
    copy("app/html", "build"),
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
