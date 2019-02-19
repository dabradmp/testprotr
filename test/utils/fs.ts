import * as fs from 'fs';
import * as path from 'path';
import { $ } from 'protractor';

export function deleteFile(filePath: string) {
    try {
        return fs.unlinkSync(filePath);
    } catch (err) {
        return err;
    }
}

export function readFile(filePath: string) {
    let text =  fs.readFileSync(filePath, { encoding: 'utf-8' });
    // check if file is CSV and if platform is Windows so we can remove '\r'
    if  (filePath.substr(filePath.length - 3) === 'csv' && process.platform === 'win32') {
        text = text.replace(/(\r)/gm, '');
    }
    return text;
}

export function uploadFile(fullPath: string) {
    const sh = require('shelljs');
    const cwd = sh.pwd().toString();
    const absolutePath = path.join(cwd, fullPath);

    $('input[type="file"]').sendKeys(absolutePath);
}
