var webpack = require('webpack');
var autoprefixer = require('autoprefixer-stylus');

module.exports = function (config) {
  config.set({

    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],

    singleRun: true,

    frameworks: ['mocha'],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240}},
          {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          {test: /\.json$/, loader: 'json-loader'},
          {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'}
        ]
      },
      stylus: {
        use: [autoprefixer()]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }

  });
};
