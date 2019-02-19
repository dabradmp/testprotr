import {browser, by, element, ElementFinder} from 'protractor';
import {WebdriverWebElement} from 'protractor/built/element';
import {AngularFormPage } from './../pages/AngularFormPage';

describe('Angular1 Form Page', () => {
    const angularFormPage = new AngularFormPage();

    beforeEach(() => {
        browser.get(angularFormPage.url);
    });

    it('should check input fields', () => {
        angularFormPage.setUserName('asd');
        angularFormPage.setNickName('newnick');

        expect(angularFormPage.bindingUsername.getText()).toEqual('asd');
        expect(angularFormPage.nicknameBind.getText()).toEqual('(' + 'newnick'.toUpperCase() + ')');

        expect(browser.getTitle()).toEqual('My AngularJS App');

        const newEl: WebdriverWebElement = element(by.model('aboutbox'));
        newEl.clear();
        newEl.sendKeys('asdf');

        const nickname = element(by.model('nickname'));
        nickname.clear();
        nickname.sendKeys('hohoho1');
    });

    it('should check checkboxes', () => {
        expect(angularFormPage.checkBoxShow.isSelected()).toBeTruthy();
        // expect(angularFormPage.shower.getText).toEqual('Shown!!');
        angularFormPage.shower.getText().then((text) => {
            expect(text).toMatch('Shown!!');
        });

        angularFormPage.checkBoxShow.click().then(() => {
            expect(angularFormPage.shower.isDisplayed()).toBeFalsy();
        });

        expect(angularFormPage.disableCheckBox.isSelected()).toBeFalsy();
        expect(angularFormPage.dummyButton.isEnabled()).toBeTruthy();
        angularFormPage.disableCheckBox.click().then(() => {
            expect(angularFormPage.dummyButton.isEnabled()).toBeFalsy();
            expect(angularFormPage.disableCheckBox.isSelected()).toBeTruthy();
        });
    });

    it('should check alert message', () => {
        angularFormPage.alertButton.click().then(() => {
            browser.wait(browser.ExpectedConditions.alertIsPresent(), 2000);
            const alert = browser.switchTo().alert();
            expect(alert.getText()).toMatch('Hello');
            alert.accept();
        });
    });
});
