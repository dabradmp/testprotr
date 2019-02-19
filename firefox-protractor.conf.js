var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var JasmineReporters = require('jasmine-reporters');

var q = require('q');
var path = require('path');
var sh = require('shelljs');
var cwd = sh.pwd().toString();
var FirefoxProfile = require('selenium-webdriver/firefox').Profile;

var makeFirefoxProfile = function(preferenceMap) {
    var profile = new FirefoxProfile();
    for (var key in preferenceMap) {
        profile.setPreference(key, preferenceMap[key]);
    }
    return q.resolve({
        browserName: 'firefox',
        marionette: true,
        firefox_profile: profile
    });
};

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
    getMultiCapabilities: function() {
        return q.all([
            makeFirefoxProfile(
                {
                    'browser.download.folderList': 2,
                    'browser.download.dir': (path.join(cwd, 'downloads')).toString(),
                    'browser.download.manager.showWhenStarting': false,
                    'browser.helperApps.alwaysAsk.force': false,
                    'browser.download.manager.useWindow': false,
                    'browser.helperApps.neverAsk.saveToDisk': 'application/octet-stream, application/json, text/comma-separated-values, text/csv, application/csv, application/excel, application/vnd.ms-excel, application/vnd.msexcel, text/anytext, text/plaintext',
                    'browser.download.manager.closeWhenDone': false,
                    'browser.download.manager.showAlertOnComplete': false,
                    'browser.download.manager.focusWhenStarting': false,
                    'browser.download.manager.alertOnEXEOpen': false,
                    'browser.helperApps.neverAsk.openFile': 'application/octet-stream, application/json, text/comma-separated-values, text/csv, application/csv, application/excel, application/vnd.ms-excel, application/vnd.msexcel, text/anytext, text/plaintext'
                }
            )
        ]);
    },
    allScriptsTimeout: 1000000,
    specs: ['./tmp/**/*.spec.js'],
    suites: {
        all: [
            './tmp/**/form.spec.js',
            './tmp/**/repeater.spec.js'
        ]
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 1000000,
        showColors: true
    },
    onPrepare: function() {
        browser.driver.getCapabilities().then(function(caps) {
            browser.browserName = caps.get('browserName');
        });

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                showPassed: false
            })
        );
        // Reporters
        jasmine.getEnv().addReporter(
            new JasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: 'reports/jUnitXmlReporter',
                filePrefix: 'xmlreport'
            })
        );
        // set screen size
        setTimeout(function() {
            browser.driver.executeScript(function() {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                };
            }).then(function(result) {
                browser.driver.manage().window().setPosition(0,0);
                browser.driver.manage().window().setSize(result.width, result.height);
            });
        });
    }
};