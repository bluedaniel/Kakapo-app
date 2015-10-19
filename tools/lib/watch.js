import gaze from "gaze";

export default (pattern) => new Promise((resolve, reject) => {
  gaze(pattern, (err, watcher) => err ? reject(err) : resolve(watcher));
});
