import {browser, by, element, ElementFinder} from 'protractor';
import { conf } from './../conf/env';

export class RepeaterPage {
    public url = `${conf.baseUrl}/ng1/#/repeater`;
    public days = element.all(by.repeater('allinfo in days'));
}
