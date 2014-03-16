# tsz UI #

## Getting Started ##

### Tracklist (incorporated frameworks) ###

* [Locomotive](http://locomotivejs.org/)
* [Express](http://expressjs.com/)
* [Angular](http://angularjs.org/)
* [karma](http://karma-runner.github.io/0.8/index.html)
* [chai](http://chaijs.com/)
* [sinon](http://sinonjs.org/)
* [Bootstrap](http://twitter.github.io/bootstrap/)
* [Less](http://lesscss.org/)
* [Jade](http://jade-lang.com/)

### Inspiration ###

* [Backbone Boilerplate](https://github.com/backbone-boilerplate/backbone-boilerplate)
* [angular-app](https://github.com/angular-app/angular-app)
* [Angular Fun](https://github.com/CaryLandholt/AngularFun)
* [Grails](http://grails.org/)

### Dependencies ###

* [Node](http://nodejs.org/)
* [Mongo](http://www.mongodb.org/)
* [Grunt](https://github.com/cowboy/grunt) `npm install -g grunt-cli` 
* [Bower](http://twitter.github.com/bower/) `npm install -g bower`
* [Nodemon](https://github.com/remy/nodemon/) `npm install -g nodemon`
* [Docco](http://jashkenas.github.io/docco/) `npm install -g docco`
* [Karma](https://github.com/karma-runner/karma/) `npm install -g karma`

### Releasing ###
1. Start by creating a release branch using the standard GitFlow conventions.
2. Modify the `version` attribute in `package.json` and `bower.json` to the official release version (without "SNAPSHOT").
3. Commit the changes to the release branch.
4. Run `grunt release` to build, test, and publish the release artifact to Nexus.
5. Once the artifact has been published, finish the release branch (including standard GitFlow practices like tagging).
6. Switch to the development branch and increment the version to the next release snapshot (e.g. 1.2.3-SNAPSHOT).
7. Commit the new development version to develop.
8. Push the master branch and development branches to origin.

### Quick Start ###

#### Install the Node dependencies locally. ####
`npm install`

#### Run init task to initialize a freshly checked out project ####
`grunt init`

## Grunt Tasks ##
### These are all the Grunt.js tasks in their entirety: ###

* `clean` - Remove the server dist, client dist, client docs, and client test reports.
* `jshint` - Runs the client src and tests through the JSHint Javascript linter.
* `less` - Compiles the less stylesheets into css.
* `ngtemplates` - Combines the src templates into a single javascript file that populates the angular template cache.  The output file path of this task is appended to the src of the concat:js task.
* `concat:jsdeps` - Combines the javascript libraries into a single unminified file.  This output file will be included in the concat:appjs task.
* `concat:appjs` - Combines the javascript libraries, client src, and templates javascript into a single unminified file.
* `concat:css` - Combines the application stylesheets with library stylesheets into a single unminified file.
* `cssmin` - Minifies the output of concat:css 
* `uglify` - Run the concatenated javascript file through the Uglify2 minifier
* `watch:development` - Watches the source files and builds the application for development on any change. 
* `watch:debug` - Watches the source files and builds the application for debug on any change. 
* `watch:production` - Watches the source files and builds the application for production on any change. 
* `watch:server` - Watches server files for any change and then runs the server-side Mocha tests.
* `karma:unit` - Starts the karama runner for client-side unit tests.  Tests are ran when the task is re-invoked from the watch task.
* `karma:e2e` - Starts the karama runner for client-side e2e tests.  Tests are ran when the task is re-invoked from the watch task. 
* `karma:unitci` - Runs the unit tests immediately (for CI builds). The application server must be started for this to work correctly.
* `karma:e2eci` - Runs the e2e tests immediately (for CI builds).  The application server must be started for this to work correctly.
* `mochacli` - Runs the server side Mocha tests.
* `copy` - Stages all the files for running the application.  Each of these tasks are cumulative where production builds off of debug, debug off of development, and development off of vendor. 
* `copy:vendor` - Stages all of the 3rd party library files 
* `copy:development` - Stages all the files required for development mode 
* `copy:debug` - Stages all the files required for debug mode 
* `copy:production` - Stages all the files required for production mode 
* `jade:debug` - Compiles the server-side jade templates for deployment in debug mode
* `jade:production` - Compiles the server-side jade templates for deployment in production mode
* `docco:client` - Builds the docco for the client source
* `docco:app` - Builds the docco for the server/app source
* `docco:grunt` - Builds the docco for the Grunt file
* `docco:config` - Builds the docco for the server side configuration files
* `runapp:development` - Runs the application server in development mode inside a nodemon process that restarts the server on source changes.
* `runapp:debug` - Runs the application server in debug mode inside a nodemon process that restarts the server on source changes.
* `runapp:production` - Runs the application server in production mode inside a nodemon process that restarts the server on source changes.
* `runapp:test` - Runs the application for tests.  This server is ran in the background and terminated once the parent Grunt task ends. 


### And a couple of shortcut tasks to run various combinations: ###

* `grunt init` 

  * Runs bower install
  * Runs the production task

* `grunt angular` 

  * Runs NPM install for the angular project
  * Runs the Angular package Grunt task

* `grunt development` 

  * Cleans the project
  * Runs JSHint
  * Compiles the LESS files
  * Concatinates the CSS files
  * Concatinates the application javascript dependencies (for the unit and e2e tests)
  * Stages the vendor and application development files

* `grunt debug` 

  * Runs the development build
  * Runs ngtemplates to concatenate the applciation template files into javascript
  * Concatenates the JavaScript dependencies, application source, and templates in a single file
  * Compiles the Jade templates in debug mode
  * Stages the application debug files

* `grunt production` 

  * Runs the debug build
  * Minifies CSS files
  * Minifies JavaScript files
  * Compiles the Jade templates in production mode
  * Stages the application production files

* `grunt test`

  * Runs the production build
  * Forks the current process and starts the application server (for e2e testing)
  * Runs the karma unit tests `karma:unitci`
  * Runs the karma e2e tests `karma:e2eci`
  * On completion, the forked node server shuts down

* `grunt deploy`
  * Runs `grunt test`
  * Runs `maven:deploy` to deploy the project zip artifact to the Nexus snapshot repository.

* `grunt release`
  * Runs `grunt test`
  * Runs `maven:release` to deploy the project zip artifact to the Nexus release repository.
