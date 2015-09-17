var gulp = require("gulp");
var fs = require("fs");
var rename = require("gulp-rename");
var awspublish = require("gulp-awspublish");
var parallelize = require("concurrent-transform");
var config = require("../config");
var awsCredentials = JSON.parse(fs.readFileSync("./aws.json"));

var headers = { "Cache-Control": "max-age=3600, no-transform, public" };

gulp.task("s3-app", function () {
  awsCredentials.params = {Bucket: "www.kakapo.co"};
  var publisher = awspublish.create(awsCredentials);
  return gulp.src(config.distributionDirectory + "/**")
    .pipe(parallelize(publisher.publish(headers), 10))
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});

gulp.task("s3-app-gzip", function () {
  awsCredentials.params = {Bucket: "www.kakapo.co"};
  var publisher = awspublish.create(awsCredentials);
  return gulp.src(config.distributionDirectory + "/**/*.{js,css}")
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task("s3-data", function () {
  awsCredentials.params = {Bucket: "data.kakapo.co"};
  var publisher = awspublish.create(awsCredentials);

  ["data", "i18n", "images"].forEach(function(n) {
    gulp.src(config.sourceDirectory + "/" + n + "/**")
      .pipe(rename(function(path) {
        path.dirname += "/" + n;
      }))
      .pipe(parallelize(publisher.publish(headers), 10))
      .pipe(awspublish.reporter());
  });
});
