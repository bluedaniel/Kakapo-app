import notify from "gulp-notify";

export default function(errorObject) {
  notify.onError(errorObject.toString().split(": ").join(":\n")).apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === "function") {
    this.emit("end");
  }
};
