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
