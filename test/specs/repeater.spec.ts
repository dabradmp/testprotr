import {browser, by, element, ElementFinder} from 'protractor';
import {RepeaterPage } from './../pages/RepeaterPage';

describe('Angular1 Repeater Page', () => {
    const repeaterPage = new RepeaterPage();

    beforeEach(() => {
        browser.get(repeaterPage.url);
    });

    it('should have 5 days', () => {
        expect(repeaterPage.days.count()).toEqual(5);
    });
});
