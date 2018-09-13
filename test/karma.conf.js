module.exports = function (config) {
  config.set({

    basePath: '../',
    frameworks: ['browserify', 'mocha', 'chai'],

    browsers: ['PhantomJS'],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.js',
      'test/**/*.spec.js'
    ],

    exclude: [],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      bundleDelay: 1000,
      transform: [
        [
          'babelify',
          { presets: ['@babel/preset-env'] }
        ]
      ],
      extensions: ['.js']
    },

    reporters: ['spec'],

    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true
    // define reporters, port, logLevel, browsers etc.
  })
}
