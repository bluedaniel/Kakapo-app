import gulp from "gulp";
import shell from "gulp-shell";
import packagejson from "../../package.json";

gulp.task("installer-mac", shell.task([
  "codesign --deep -v -f -s '<%= identity %>' <%= file %>/Contents/Frameworks/*",
  "codesign -v -f -s '<%= identity %>' <%= file %>",
  "codesign -vvv --display <%= file %>",
  "codesign -v --verify <%= file %>",
  "mkdir -p release",
  "chmod +x release",
  "ditto -c -k --sequesterRsrc --keepParent <%= file %> release/<%= name %>-<%= v %>-Mac.zip"
], {
  templateData: {
    identity: "Developer ID Application: Daniel Levitt",
    name: "Kakapo",
    v: packagejson.version,
    file: ".tmp/darwin/Kakapo-darwin-x64/Kakapo.app"
  }
}));
