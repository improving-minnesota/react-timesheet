# tsz UI #

## Getting Started ##

### Tracklist (incorporated frameworks) ###

* [Express](http://expressjs.com/)
* [Angular](http://angularjs.org/)
* [karma](http://karma-runner.github.io/0.8/index.html)
* [chai](http://chaijs.com/)
* [sinon](http://sinonjs.org/)
* [Bootstrap](http://twitter.github.io/bootstrap/)
* [Less](http://lesscss.org/)
* [Jade](http://jade-lang.com/)

### Dependencies ###

* [Node](http://nodejs.org/)
* [Grunt](https://github.com/cowboy/grunt) `npm install -g grunt-cli` 
* [Bower](http://twitter.github.com/bower/) `npm install -g bower`
* [Nodemon](https://github.com/remy/nodemon/) `npm install -g nodemon`

### Quick Start ###

#### Install the Node dependencies locally. ####
`npm install`

## Grunt Tasks ##
### These are all the Grunt.js tasks in their entirety: ###

* `clean` - Remove the server dist, client dist, client docs, and client test reports.

* `jshint` - Runs the client src and tests through the JSHint Javascript linter.

* `less` - Compiles the less stylesheets into css.

* `html2js` - Combines the src templates into a single javascript file that populates the angular template cache.  The output file path of this task is appended to the src of the concat:js task.

* `ngmin` - Combines the Angular source and prepares it for minification.

* `concat:jsdeps` - Combines the javascript libraries into a single unminified file.  This output file will be included in the concat:appjs task.
* `concat:appjs` - Combines the javascript libraries, client src, and templates javascript into a single unminified file.
* `concat:css` - Combines the application stylesheets with library stylesheets into a single unminified file.

* `cssmin` - Minifies the output of concat:css 

* `uglify` - Run the concatenated javascript file through the Uglify2 minifier

* `copy:vendor` - Stages all of the 3rd party library files 
* `copy:development` - Stages all the files required for development mode 
* `copy:production` - Stages all the files required for production mode 

* `jade:development` - Compiles the server-side jade templates for deployment in development mode
* `jade:production` - Compiles the server-side jade templates for deployment in production mode

* `docco:client` - Builds the docco for the client source
* `docco:app` - Builds the docco for the server/app source
* `docco:grunt` - Builds the docco for the Grunt file
* `docco:config` - Builds the docco for the server side configuration files

* `env` - Sets the NODE_ENV variable for runtime environment.

* `shell:server` - Runs the server.js in Nodemon.
* `shell:debug` - Runs the server.js in node-debug and opens the node inspector.

* `watch:development` - Watches the source files and builds the application for development on any change. 
* `watch:production` - Watches the source files and builds the application for production on any change. 

* `karma:unit` - Starts the karama runner for client-side unit tests.  Tests are ran when the task is re-invoked from the watch task.
* `karma:e2e` - Starts the karama runner for client-side e2e tests.  Tests are ran when the task is re-invoked from the watch task. 

* `protractor:e2e` - Runs the E2E tests via Protractor.
* `protractor:debug` - Runs the E2E tests in debug mode. 

### And a couple of shortcut tasks to run various combinations: ###

* `grunt development` 

  * Cleans the project
  * Runs JSHint
  * Compiles the LESS files
  * Concatinates the CSS files
  * Compiles the HTML templates into Angular modules. 
  * Concatinates the application javascript dependencies (for the unit and e2e tests)
  * Stages the vendor and application development files

* `grunt production` 

  * Runs the development build
  * Prepares the Angular source files for minification.
  * Concatenates the application's javascript files into one.
  * Minifies CSS files
  * Minifies JavaScript files
  * Compiles the Jade templates in production mode
  * Stages the application production files

* `grunt serve:development`

  * Sets the environment to 'development'.
  * Starts the node server and watches for changes to the server code.

* `grunt serve:production`

  * Runs the node server in 'production' mode and watches for changes.

* `grunt debugger`

  * Runs the node server in 'development' mode and opens the node inspector for debugging. 