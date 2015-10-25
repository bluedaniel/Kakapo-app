import packager from "electron-packager";
import packagejson from "../package.json";
import task from "./lib/task";
import del from "del";

process.env.NODE_ENV = "production";

const opts = {
  "app-version": packagejson.version,
  asar: true,
  dir: "build",
  icon: "build/images/app",
  name: "Kakapo",
  version: "0.34.0",
  ignore: [
    "/user-data($|/)"
  ]
};

export default task("package", async() => {
  await require("./build")();
  await del("release");
  await Promise.all(["linux", "win32", "darwin"].map(plat =>
    new Promise((resolve, reject) =>
      packager({...opts, ... {
        platform: plat,
        arch: "x64",
        out: "./release/" + plat
      }}, (err, path) => {
        if (err) reject(err);
        resolve(path);
      })
    )
  ));
});
