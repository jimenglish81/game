# game

TODO - write

#perfjankie
'use strict';

var Promise = require('bluebird');
var fs = require('fs');
var browserPerf = require('browser-perf');
var path = require('path');
var objectAssign = require('object-assign');
var perfjankie = require('perfjankie');
var wd = require('wd');

function runAction(options, preScript, actionName, action) {
  var browser = wd.promiseChainRemote();
  var browserPerfOptions = {
    browsers: options.browsers,
    selenium: 'http://' + options['selenium-host'] + ':' +  + options['selenium-port'] + '/wd/hub',
    preScript: preScript,
    actions: action ? [action] : null,
    debugBrowser: options['debug-browser']
  };
  var perfjankieOptions;
  if (options['couch-db']) {
    perfjankieOptions = objectAssign(browserPerfOptions, {
      url: options.url,
      name: actionName,
      suite: options['test-suite-name'],
      time: new Date().getTime(),
      run: options.version,
      repeat: options.repeat,
      couch: {
        server: options['couch-server'],
        database: options['couch-db'],
        updateSite: options['update-site'],
        onlyUpdateSite: false
      },
      debugBrowser: options.debug,
      selenium: {
        hostname: options['selenium-host'],
        port: options['selenium-port']
      }
    });
  }

  return new Promise(function(resolve, reject) {
    var callback = function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve({
          name: actionName,
          results: results,
          suite: options['test-suite-name'],
          version: options.version
        });
      }
    };
    if (perfjankieOptions) {
      perfjankieOptions.callback = callback;
      perfjankie(perfjankieOptions);
    } else {
      browserPerf(options.url, callback, browserPerfOptions);
    }
  });
}


module.exports = function(options) {
  var actions;
  var preScript;
  try {
    preScript = require(path.join(process.cwd(), options['pre-script']))(wd);
  } catch(e) {}
  try {
    actions = require(path.join(process.cwd(), options.actions))(wd);
  } catch(e) {
    actions = {
      'default-page-scroll': null
    };
    console.log('No actions specified: using default page scroll action.');
  }

  return Promise.all(Object.keys(actions).map(function(actionName) {
    return runAction(options, preScript, actionName, actions[actionName]);
  }))
  .then(function(results) {
    fs.writeFileSync(options.report, JSON.stringify(results, null, 2));
    console.log('Results saved to: ' + options.report);
  })
  .catch(function(err) {
    if (err[0] && err[0].message) {
      console.log(err[0].cause.value.localizedMessage.replace(/\\n/g, '\\n'));
      //console.log(JSON.stringify(err, null, 2));
    } else {
      console.log(err);
    }
    process.exit(1);
  });
};

#karma config
module.exports = function(grunt) {

   var fs = require('fs'),
      path = require('path'),
      root = path.normalize(__dirname + '/..'),
      pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')),
      deps = pkg.dependencies ? Object.keys(pkg.dependencies) : [],
      systemConfig = {
         paths: {
            'babel': 'node_modules/babel-core/browser.js',
            'lodash': 'node_modules/lodash/index.js',
            'bluebird': 'node_modules/bluebird/js/browser/bluebird.js',
            'reqwest': 'node_modules/reqwest/src/reqwest.js',
            'backbone-events-standalone': 'node_modules/backbone-events-standalone/backbone-events-standalone.js'
         }
      },
      phantomCmd = {
         linux: 'node_modules/phantomjs-binaries/1.9.8/linux/phantomjs',
         darwin: 'node_modules/phantomjs-binaries/1.9.8/darwin/phantomjs',
         win32: 'node_modules/phantomjs-binaries/1.9.8/win32/phantomjs.exe'
      },
      chromeDependencies = [
         {src: ['node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js'], included: true},
         {src: ['node_modules/systemjs/dist/system.src.js'], included: true},
         {src: ['node_modules/babel-core/browser-polyfill.js'], included: true},
         {src: ['node_modules/babel-core/browser.js'], included: false},
         {src: ['lib/**/*.js'], included: false, watched: true}
      ],
      phantomDependencies = [
         {src: ['node_modules/es5-shim/es5-shim.js'], included: true},
         {src: ['node_modules/bluebird/js/browser/bluebird.js'], included: true}
      ].concat(chromeDependencies);

   deps.forEach(function(dep) {
      phantomDependencies.push({src: ['node_modules/' + dep + '/**/*.js'], included: false});
      chromeDependencies.push({src: ['node_modules/' + dep + '/**/*.js'], included: false});
   });

   grunt.config.merge({
      karma: {
         options: {
            // to avoid 'DISCONNECTED' messages on slower machines.
            browserNoActivityTimeout: 20000, //default 10000
            client: {
               args: [JSON.stringify(systemConfig)]
            }
         },
         unit_test: {
            singleRun: true,
            browsers: ['PhantomJS'],
            plugins: ['karma-*'],
            frameworks: ['mocha', 'chai', 'sinon'],
            basePath: '.',
            reportSlowerThan: 150,
            reporters: ['progress', 'junit'],
            junitReporter: {
               outputFile: 'reports/unit/report.xml'
            },
            phantomjsLauncher: {
               cmd: phantomCmd
            },
            files: phantomDependencies.concat([
               {src: ['test/unit/main.js'], included: true, watched: true},
               {src: ['test/unit/**/*.js'], included: false, watched: true}
            ])
         },
         unit_test_debug: {
            singleRun: false,
            browsers: ['Chrome'],
            plugins: ['karma-*'],
            frameworks: ['mocha', 'chai', 'sinon'],
            basePath: '.',
            reportSlowerThan: 150,
            reporters: ['progress', 'junit'],
            junitReporter: {
               outputFile: 'reports/unit/report.xml'
            },
            files: chromeDependencies.concat([
               {src: ['test/unit/main.js'], included: true, watched: true},
               {src: ['test/unit/**/*.js'], included: false, watched: true}
            ])
         },
         integration_test: {
            singleRun: true,
            browsers: ['PhantomJS'],
            plugins: ['karma-*'],
            frameworks: ['mocha', 'chai', 'sinon'],
            basePath: '.',
            reportSlowerThan: 500,
            reporters: ['progress', 'junit'],
            junitReporter: {
               outputFile: 'reports/integration/report.xml'
            },
            phantomjsLauncher: {
               cmd: phantomCmd,
               options: {
                  onCallback: function(command, options) {
                     if (command == 'screenshot') {
                        page.render('reports/integration/screenshot/' + options.path, { format: options.type });
                     }
                  }
               }
            },
            files: phantomDependencies.concat([
               {src: ['test/integration/main.js'], included: true, watched: true},
               {src: ['test/integration/**/*.js'], included: false, watched: true}
            ])
         },
         integration_test_debug: {
            singleRun: false,
            browsers: ['Chrome'],
            plugins: ['karma-*'],
            frameworks: ['mocha', 'chai', 'sinon'],
            basePath: '.',
            reportSlowerThan: 500,
            reporters: ['progress', 'junit'],
            junitReporter: {
               outputFile: 'reports/integration/report.xml'
            },
            files: chromeDependencies.concat([
               {src: ['test/integration/main.js'], included: true, watched: true},
               {src: ['test/integration/**/*.js'], included: false, watched: true}
            ])
         },
         acceptance_test: {
            singleRun: true,
            browsers: ['PhantomJS'],
            plugins: ['karma-*'],
            frameworks: ['cucumberjs', 'chai', 'sinon'],
            basePath: '.',
            reportSlowerThan: 5000,
            reporters: ['progress', 'junit'],
            junitReporter: {
               outputFile: 'reports/acceptance/report.xml'
            },
            phantomjsLauncher: {
               cmd: phantomCmd
            },
            files: [
               {src: ['node_modules/polyfill-function-prototype-bind/bind.js'], included: true},
               {src: ['node_modules/es6-promise-polyfill/promise.js'], included: true},
               {src: ['node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js'], included: true},
               {src: ['node_modules/systemjs/dist/system.src.js'], included: true},
               {src: ['node_modules/babel-core/browser-polyfill.js'], included: true},
               {src: ['node_modules/babel-core/browser.js'], included: false},
               {src: ['node_modules/bluebird/js/browser/bluebird.js'], included: false},
               {src: ['node_modules/lodash/index.js'], included: false},
               {src: ['node_modules/reqwest/src/reqwest.js'], included: false},
               {src: ['node_modules/backbone-events-standalone/backbone-events-standalone.js'], included: false},
               {src: ['node_modules/karma-cucumberjs/vendor/cucumber-html.css'], included: false},
               {src: ['test/integration/environment.js'], included: false},
               {src: ['test/integration/data/**/*.js'], included: false},
               {src: ['test/integration/lib/mock-lightstreamer-service.js'], included: false},
               {src: ['test/acceptance/main.js'], included: false},
               {src: ['test/acceptance/app.template'], included: false},
               {src: ['test/acceptance/features/**/*.feature'], included: false},
               {src: ['test/acceptance/features/**/*.js'], included: false},
               {src: ['test/acceptance/support/**/*.js'], included: false},
               {src: ['lib/**/*.js'], included: false}
            ]
         },
         acceptance_test_debug: {
            singleRun: false,
            browsers: ['Chrome'],
            plugins: ['karma-*'],
            frameworks: ['cucumberjs', 'chai', 'sinon'],
            basePath: '.',
            reportSlowerThan: 5000,
            reporters: ['progress', 'junit'],
            junitReporter: {
               outputFile: 'reports/acceptance/report.xml'
            },
            phantomjsLauncher: {
               cmd: phantomCmd
            },
            files: [
               {src: ['node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js'], included: true},
               {src: ['node_modules/systemjs/dist/system.src.js'], included: true},
               {src: ['node_modules/babel-core/browser-polyfill.js'], included: true},
               {src: ['node_modules/babel-core/browser.js'], included: false},
               {src: ['node_modules/bluebird/js/browser/bluebird.js'], included: false},
               {src: ['node_modules/lodash/index.js'], included: false},
               {src: ['node_modules/reqwest/src/reqwest.js'], included: false},
               {src: ['node_modules/backbone-events-standalone/backbone-events-standalone.js'], included: false},
               {src: ['node_modules/karma-cucumberjs/vendor/cucumber-html.css'], included: false},
               {src: ['test/integration/environment.js'], included: false},
               {src: ['test/integration/data/**/*.js'], included: false},
               {src: ['test/integration/lib/mock-lightstreamer-service.js'], included: false},
               {src: ['test/acceptance/main.js'], included: false},
               {src: ['test/acceptance/app.template'], included: false},
               {src: ['test/acceptance/features/**/*.feature'], included: false},
               {src: ['test/acceptance/features/**/*.js'], included: false},
               {src: ['test/acceptance/support/**/*.js'], included: false},
               {src: ['lib/**/*.js'], included: false}
            ]
         }
      }
   });
};

#npm
grunt-contrib-connect - two servers (front end and mw)
istanbul
  "es5-shim": "4.1.5",
    "es6-module-loader": "0.16.5",
    "es6-promise-polyfill": "1.0.0",
    "grunt": "0.4.5",
    "grunt-babel": "5.0.0",
    "grunt-cli": "0.1.13",
    "grunt-contrib-clean": "0.6.0",
    "grunt-contrib-copy": "0.8.0",
    "grunt-contrib-jshint": "0.11.2",
    "grunt-contrib-requirejs": "0.4.4",
    "grunt-esdoc": "0.0.1",
    "grunt-jscs": "2.0.0",
    "grunt-karma": "0.10.1",
    "ig-grunt-release": "0.7.0",
    "jscs": "2.0.0",
    "karma": "0.12.31",
    "karma-chai": "0.1.0",
    "karma-chrome-launcher": "0.1.8",
    "karma-cucumberjs": "0.0.3",
    "karma-junit-reporter": "0.2.2",
    "karma-mocha": "0.1.10",
    "karma-phantomjs-launcher-nonet": "0.1.3",
    "karma-sinon": "1.0.4",
    "phantomjs-binaries": "0.1.2",
    "polyfill-function-prototype-bind": "0.0.1",
    "sinon": "1.15.4",
    "systemjs": "0.16.7"
    
    
    
    #webpack
    path.resolve(__dirname, "app/folder")

