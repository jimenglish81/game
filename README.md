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

