/* eslint no-shadow: 0, func-names: 0, no-unused-vars: 0, no-console: 0 */
var os = require("os");
var webpack = require("webpack");
var cfg = require("./gulpfile.js/config/webpack-production.config.js");
var packager = require("electron-packager");
var assign = require("object-assign");
var del = require("del");
var exec = require("child_process").exec;
var argv = require("minimist")(process.argv.slice(2));
var packagejson = require('./package.json');

var DEFAULT_OPTS = {
  'app-version': packagejson.version,
  asar: true,
  dir: "./",
  icon: "app/images/app.icns",
  name: "Kakapo",
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
  ].concat(Object.keys(packagejson.devDependencies).map(function(name) {
    return "/node_modules/" + name + "($|/)";
  }))
};


// use the same version as the currently-installed electron-prebuilt
exec("npm list | grep electron-prebuilt", function(err, stdout, stderr) {
  if (err) {
    DEFAULT_OPTS.version = "0.33.1";
  } else {
    DEFAULT_OPTS.version = stdout.split("@")[1].replace(/\s/g, "");
  }
  startPack();
});

function startPack() {
  console.log("start pack...");
  webpack(cfg, function runWebpackBuild(err, stats) {
    if (err) return console.error(err);
    del("release")
      .then(function(paths) {
        ["linux", "win32", "darwin"].forEach(function(plat) {
          packager(assign({}, DEFAULT_OPTS, {
            platform: plat,
            arch: "x64",
            out: "release/" + plat
          }), function() {
            console.log(plat + " finished!");
          });
        });
      })
      .catch(function(err) {
        console.error(err);
      });
  });
}
