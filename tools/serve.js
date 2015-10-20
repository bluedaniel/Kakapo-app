import path from "path";
import express from "express";
import task from "./lib/task";

export default task("serve", () => new Promise((resolve, reject) => {
  const server = global.server = express();

  server.set("port", (process.env.PORT || 5000));
  server.use(express.static(path.resolve(__dirname, "../build")));

  server.listen(server.get("port"), () => {
    /* eslint-disable no-console */
    console.log("The server is running at http://localhost:" + server.get("port"));
    resolve();
  });

  server.once("error", err => reject(err));
  process.on("exit", () => server.kill("SIGTERM"));
  return server;
}));
