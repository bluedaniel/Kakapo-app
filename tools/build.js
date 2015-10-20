import task from "./lib/task";

export default task("build", async () => {
  await require("./clean")();
  await require("./copy")();
  await require("./bundle")();
});
