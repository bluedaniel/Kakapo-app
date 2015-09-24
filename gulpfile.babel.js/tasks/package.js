/* eslint no-shadow: 0, func-names: 0, no-unused-vars: 0, no-console: 0 */
import gulp from "gulp";
import packager from "electron-packager";
import assign from "object-assign";
import del from "del";
import packagejson from "../../package.json";

var DEFAULT_OPTS = {
  "app-version": packagejson.version,
  asar: true,
  dir: "./",
  icon: "app/images/app.icns",
  name: "Kakapo",
  version: "0.33.1",
  ignore: [
    "/bower.json",
    "/bower_components($|/)",
    "/gulpfile.js($|/)",
    "/test($|/)",
    "/tools($|/)",
    "/release($|/)",
    "/app/scripts($|/)",
    "/app/styles($|/)",
    "/app/index-dev.html"
  ].concat(Object.keys(packagejson.devDependencies).map(name => "/node_modules/" + name + "($|/)"))
};

gulp.task("package", () =>
  del("release")
  .then(() => {
    ["linux", "win32", "darwin"].forEach(plat => {
      packager(assign({}, DEFAULT_OPTS, {
        platform: plat,
        arch: "x64",
        out: "release/" + plat
      }), () => console.log(plat + " finished!"));
    });
  })
  .catch(err => console.error(err)));
