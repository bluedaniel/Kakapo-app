module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-preset-env': options['postcss-preset-env']
      ? options['postcss-preset-env']
      : false,
    lost: {},
    'postcss-url': {},
    'postcss-nested': {},
    'postcss-browser-reporter': {},
    'postcss-reporter': {},
    cssnano: env === 'production' ? options.cssnano : false,
  },
});
