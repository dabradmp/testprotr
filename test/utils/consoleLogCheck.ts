import { browser } from 'protractor';

export function consoleLogCheck() {
    browser.manage().logs().get('browser').then((browserLog) => {
        const browserConsoleLog = require('util').inspect(browserLog);
        expect(browserConsoleLog.search(/error/gi) === -1).toBe(true,
            'Error was found in browser console => ' + browserConsoleLog);
    });
}
