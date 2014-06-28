module.exports = function(config) {
  config.set({

    background: true,
    autoWatch: true,

    frameworks: ['jasmine'],

    files: [
      '../node_modules/chai/chai.js',
      '../node_modules/chai-as-promised/lib/chai-as-promised.js',
      '../node_modules/sinon-chai/lib/sinon-chai.js',
      '../node_modules/sinon/pkg/sinon.js',

      {pattern: 'dist/assets/js/deps.js', watched: false},
      'src/**/*.js',

      'assets/js/angular-mocks/angular-mocks.js',

      'test/unit/**/*.spec.js',

      'assets/templates/**/*.html'
    ],

    basePath : 'client',

		// generate js files from html templates
		preprocessors : {
      'assets/templates/**/*.html': ['ng-html2js']
    },

    browsers: ['Chrome'],

    plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-ng-html2js-preprocessor']
  });
};
