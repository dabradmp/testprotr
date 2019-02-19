var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var JasmineReporters = require('jasmine-reporters');
var q = require('q');
var path = require('path');
var sh = require('shelljs');
var cwd = sh.pwd().toString();

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
    multiCapabilities: [
        {
            browserName: 'chrome',
            shardTestFiles: false,
            maxInstances: 1,
            specs: [
                './tmp/**/form.spec.js'
            ],
            chromeOptions: {
                args: [
                    '--window-size=1920,1080'],
                prefs: {
                    download: {
                        prompt_for_download: false,
                        default_directory: (path.join(cwd, 'downloads')).toString(),
                    }
                }
            }
        },
        {
            browserName: 'chrome',
            shardTestFiles: false,
            maxInstances: 1,
            specs: [
                './tmp/**/repeater.spec.js'
            ],
            chromeOptions: {
                args: [
                    '--window-size=1920,1080'],
                prefs: {
                    download: {
                        prompt_for_download: false,
                        default_directory: (path.join(cwd, 'downloads')).toString(),
                    }
                }
            }
        },
        {
            browserName: 'firefox',
            shardTestFiles: false,
            maxInstances: 1,
            specs: [
                './tmp/**/form.spec.js'
            ]
        },
        {
            browserName: 'firefox',
            shardTestFiles: false,
            maxInstances: 1,
            specs: [
                './tmp/**/repeater.spec.js'
            ]
        }
    ],
    allScriptsTimeout: 1000000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 1000000,
        showColors: true
    },
    onPrepare: function() {
        browser.driver.getCapabilities().then(function(caps) {
            browser.browserName = caps.get('browserName');
        });

        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        browser.getProcessedConfig().then(function(config) {
            var capabilities = config.capabilities;
            jasmine.getEnv().addReporter(
                new Jasmine2HtmlReporter({
                    savePath: './reports/',
                    takeScreenshots: true,
                    screenshotsFolder: './screenshots',
                    filePrefix: 'protractor-tests-report-' + capabilities.platform + '-' + capabilities.browserName,
                    consolidateAll: false,
                    takeScreenshotsOnlyOnFailures: true,
                })
            );
        });
        // Reporters
        var jasmineReporters = require('jasmine-reporters');
        return browser.getProcessedConfig().then(function(config) {
            // you could use other properties here if you want, such as platform and version
            var browserName = config.capabilities.browserName;
            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: false,
                savePath: 'reports/jUnitXmlReporter',
                modifyReportFileName: function(generatedFileName, suite) {
                    return browserName + '.' + generatedFileName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
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
        });
    }
};