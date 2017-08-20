const ora = require('ora');

const timeStr = start => () => {
  const time = new Date().getTime() - start.getTime();
  return time < 1000 ? `${time} ms` : `${Math.floor(time / 1000)} seconds`;
};

const run = async (fn, options) => {
  const func = typeof fn === 'string' ? require(`./${fn}.js`) : fn; // eslint-disable-line
  if (!func.default) return;
  const start = new Date();
  const spinner = ora(`Running ${func.default.name}`).start();
  try {
    await func.default(options);
    spinner.succeed(`Finished ${func.default.name} in ${timeStr(start)()}`);
  } catch (err) {
    spinner.fail(`Error ${func.default.name}`);
    console.error(err);
  }
};

if (process.mainModule.children.length === 1 && process.argv.length > 2) {
  delete require.cache[__filename];
  run(process.argv[2]);
}

export default run;
