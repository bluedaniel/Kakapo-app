import config from "./";

export default {
  autoprefixer: { browsers: ["last 2 version"] },
  src: config.sourceDirectory + "/styles/**/*.{sass,scss}",
  dest: config.distributionDirectory + "/styles",
  settings: {
    indentedSyntax: true, // Enable .sass syntax!
    imagePath: "../images" // Used by the image-url helper
  }
};
