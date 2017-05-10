const path = require('path');

module.exports = ctx => ({
  parser: ctx.sugar ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  from: ctx.from,
  to: ctx.to,
  plugins: {
    lost: {},
    'postcss-import': {
      addDependencyTo: ctx,
      path: [path.resolve(__dirname, 'app/scripts/styles')]
    },
    'postcss-url': {},
    'postcss-nested': {},
    // 'postcss-custom-media': {
    //   extensions: {
    //     '--viewport-small': '(width < 500px)',
    //     '--viewport-large': '(width >= 500px)'
    //   },
    //   preserve: true
    // },
    'postcss-cssnext': {}
  }
});
