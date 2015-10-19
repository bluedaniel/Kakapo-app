import ncp from "ncp";

export default (source, dest) => new Promise((resolve, reject) => {
  ncp(source, dest, err => err ? reject(err) : resolve());
});
