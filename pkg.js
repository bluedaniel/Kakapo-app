var packager = require("electron-packager");
var assign = require("object-assign");
var del = require("del");
var latest = require("github-latest-release");
var argv = require("minimist")(process.argv.slice(2));
var devDeps = Object.keys(require("./package.json").devDependencies);

var appName = argv.name || argv.n || "ElectronReact";
var shouldUseAsar = argv.asar || argv.a || false;

var DEFAULT_OPTS = {
  dir: "./",
  name: appName,
  asar: shouldUseAsar,
  prune: true,
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
  ].concat(devDeps.map(function(name) {
    return "/node_modules/" + name + "($|/)";
  }))
};

var icon = argv.icon || argv.i;

if (icon) {
  DEFAULT_OPTS.icon = icon;
}

function pack(opts, cb) {
  packager(opts, cb);
}

function thenPack(opts, cb) {
  return function() {
    packager(opts, cb);
  };
}

function log(err) {
  if (err) {
    return console.error(err);
  }
  console.log("finished!");
}

var MacOPTS, LinuxOPTS, WindowsOPTS;

function assignOpts() {
  MacOPTS = assign({}, DEFAULT_OPTS, {
    platform: "darwin",
    arch: "x64",
    out: "release/darwin"
  });

  LinuxOPTS = assign({}, DEFAULT_OPTS, {
    platform: "linux",
    arch: "x64",
    out: "release/linux"
  });

  WindowsOPTS = assign({}, DEFAULT_OPTS, {
    platform: "win32",
    arch: "x64",
    out: "release/win32"
  });
}

function packForPlatforms() {
  assignOpts();
  del.sync("release");
  pack(MacOPTS, thenPack(LinuxOPTS, thenPack(WindowsOPTS, log)));
}

var version = argv.version || argv.v;

if (version) {
  DEFAULT_OPTS.version = version;
  packForPlatforms();
} else {
  latest("atom", "electron", function(err, res) {
    if (err) {
      DEFAULT_OPTS.version = "0.27.1";
    } else {
      DEFAULT_OPTS.version = res.name.split("v")[1];
    }
    packForPlatforms();
  });
}
