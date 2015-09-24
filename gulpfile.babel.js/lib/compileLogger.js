import gutil from "gulp-util";
import prettifyTime from "./prettifyTime";
import handleErrors from "./handleErrors";

export default function(err, stats) {
  if (err) {
    throw new gutil.PluginError("webpack", err);
  }

  var statColor = stats.compilation.warnings.length < 1 ? "green" : "yellow";

  if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach(function(error) {
      handleErrors(error);
      statColor = "red";
    });
  } else {
    var compileTime = prettifyTime(stats.endTime - stats.startTime);
    gutil.log(gutil.colors[statColor](stats));
    gutil.log("Compiled with", gutil.colors.cyan("webpack:development"), "in", gutil.colors.magenta(compileTime));
  }
};
