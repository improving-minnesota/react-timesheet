module.exports = function(config) {
  config.set({

    background: true,
    autoWatch: true,

    // TODO : register the jasmine framework

    files: [
      // inject chai matchers and sinon test spy library... cuz they are awesome.
      '../node_modules/chai/chai.js',
      '../node_modules/chai-as-promised/lib/chai-as-promised.js',
      '../node_modules/sinon-chai/lib/sinon-chai.js',
      '../node_modules/sinon/pkg/sinon.js',

      // provide the entire application and dependencies
      'dist/assets/js/deps.js',
      'src/**/*.js',

      // include the angular mocks libraray
      'assets/js/components/angular-mocks/angular-mocks.js',

      // serve all specs
      'test/unit/**/*.spec.js',

      // have karma serve the templates so they are available
      'assets/templates/**/*.html'
    ],

    basePath : 'client',

		// generate js files from html templates
		preprocessors : {
      'assets/templates/**/*.html': ['ng-html2js']
    },

    // TODO : register the Chrome browser

    // plugins needed to run the jasmine tests, launch Chrome, and preprocess our html templates
    plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-ng-html2js-preprocessor']
  });
};
