import crypto from 'crypto';
import _ from 'lodash';
import configHelper from './configHelper.js';

class CryptoHelper {
    static toBase64 = (value) => {
        if (value) {
            return Buffer.from(value, 'utf8').toString('base64');
        }
        return value;
    };

    static fromBase64 = (value) => {
        if (value) {
            return Buffer.from(value, 'base64').toString();
        }
        return value;
    };

    static encryptPassword = (password, hashKey) => {
        if (_.isEmpty(password) || _.isEmpty(hashKey)) {
            return password;
        }
        return this.toBase64(crypto.pbkdf2Sync(password, hashKey, 10000, (256 / 8), 'sha512'));
    };

    static encrypt = (value) => {
        const cipher = crypto.createCipheriv('aes256', configHelper.getValue('APP_KEY'), configHelper.getValue('APP_IV'));
        let encrypted = cipher.update(value, 'utf-8', 'base64');
        encrypted += cipher.final('base64');
        return _.replace(_.replace(encrypted, '/', '*'), '+', '!');
    };

    static decrypt = (value) => {
        const encryptedValue = _.replace(_.replace(value, '*', '/'), '!', '+');
        const decipher = crypto.createDecipheriv('aes256', configHelper.getValue('APP_KEY'), configHelper.getValue('APP_IV'));
        let decrypted = decipher.update(encryptedValue, 'base64', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    };
}

export default CryptoHelper;
