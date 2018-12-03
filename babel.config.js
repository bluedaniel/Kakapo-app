module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app/scripts'],
        alias: {
          'aws-custom-build': './app/vendor/aws-sdk-2.100.0.min',
        },
      },
      'react-hot-loader/babel',
    ],
  ],
  env: {
    test: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./app/scripts'],
            alias: {
              'aws-custom-build': './app/vendor/aws-sdk-2.100.0.min',
              kakapoBridge: './app/scripts/bridge/web/index.js',
            },
          },
        ],
      ],
    },
  },
};
