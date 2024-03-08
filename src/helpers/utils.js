// all utility functions for the services
import fs from 'fs';
import HttpStatus from 'http-status-codes';
import _ from 'lodash';
import moment from 'moment';
import randomstring from 'randomstring';

import accessEnv from './accessEnv.js';
import constants from './constants.js';

function returnHttpSuccess(res, data) {
  return res.status(HttpStatus.OK).json({
    success: true,
    data,
  });
}

function returnHttpErrorForbidden(res, param, msg) {
  return res.status(HttpStatus.FORBIDDEN).json({
    success: false,
    errors: [
      {
        param,
        msg,
      },
    ],
  });
}

function returnErrorResponse(param, msg) {
  return {
    success: false,
    errors: [
      {
        param,
        msg,
      },
    ],
  };
}

function getHeaderAuthorization(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

// https://expressjs.com/en/api.html#res.cookie
function getCookieOptions() {
  const cookieExpiryOffset =
    accessEnv('COOKIE_EXPIRY_HOURS', constants.cookie.expiryInHours) *
    3600 *
    1000;
  const cookieOptions = {
    domain: accessEnv('COOKIE_DOMAIN', constants.cookie.domain),
    expires: new Date(Date.now() + cookieExpiryOffset),
    // httpOnly: true,
    secure: convertToBoolean(
      accessEnv('COOKIE_SECURE', constants.cookie.secure),
    ),
  };
  return cookieOptions;
}

function getDateFilterCondition(fieldName, fromDate, toDate) {
  const conditions = [];
  if (fromDate) {
    conditions.push({ [fieldName]: { $gte: fromDate } });
  }
  if (toDate) {
    conditions.push({ [fieldName]: { $lte: toDate } });
  }
  return conditions;
}

function getValidationParam(err) {
  return _.get(err, 'errors.name.path', null);
}

function getServerTempFileNameWithPath(fileName) {
  const tmpDirectory = accessEnv(
    'PDF_FILE_TMP_DIRECTORY',
    constants.file.tmpDirectory,
  );
  return `${tmpDirectory}/${fileName}`;
}

function convertToBoolean(value) {
  if (!_.isNil(value)) {
    const valueLower = _.toLower(value);
    if (
      valueLower === 'true' ||
      valueLower === 'yes' ||
      valueLower === 'yes?' ||
      valueLower === 'y' ||
      valueLower === '1'
    ) {
      return true;
    }
  }
  return false;
}

function convertToNumber(value) {
  if (!_.isNil(value)) {
    return _.toNumber(value);
  }
  return 0;
}

function displayDate(value) {
  return moment(value).format('MM/DD/YYYY');
}

function displayUtcDateTimeWithYear(value) {
  const gmtDateTime = moment.utc(value);
  return gmtDateTime.format('MM/DD/YYYY hh:mm A');
}

function isBefore(value) {
  return moment().isBefore(moment(value));
}

function isAfter(value) {
  return moment().isAfter(moment(value));
}

function isWithinHours(date, hours = 1) {
  return moment(date).isAfter(moment().subtract(hours, 'hours'));
}

function isDateInRange(value, startDate, endDate) {
  return moment(value).isBetween(startDate, endDate, null, '[]');
}

function isValidDate(date) {
  return moment(date, 'MM/DD/YYYY').isValid();
}

function isValidFutureDate(date) {
  return moment(date, 'MM/DD/YYYY').isSameOrAfter(moment(), 'day');
}

function getUtcDate(date) {
  return moment(date, 'MM/DD/YYYY').utc();
}

function getTodayDate() {
  return moment();
}

function getMonthYearLabel(date) {
  return moment(date).format('MMMM YYYY');
}

function validateStartAndEndDate(startAt, endAt) {
  const startMoment = moment(startAt);
  const endMoment = moment(endAt);

  if (startMoment.isSame(endMoment, 'day')) {
    return false;
  }

  if (startMoment.isAfter(endMoment)) {
    return false;
  }

  return true;
}


function getFromDateTime(date) {
  if (date) {
    const newDate = moment(date);
    return new Date(newDate.year(), newDate.month(), newDate.date());
  }
  return null;
}

function getToDateTime(date) {
  if (date) {
    const newDate = moment(date);
    return new Date(
      newDate.year(),
      newDate.month(),
      newDate.date(),
      23,
      59,
      59,
      999,
    );
  }
  return null;
}

function isDateBetween(dateToCompare, startDate, endDate) {
  return startDate <= dateToCompare && dateToCompare <= endDate;
}

function displayCurrency(value) {
  if (_.isNumber(value)) {
    const convertedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `$${convertedValue}`;
  }
  return value;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumberByLength(length = 6) {
  const number = parseInt(
    randomstring.generate({
      length,
      charset: 'numeric',
    }),
    10,
  );
  return number + 1;
}

function getRandomBoolean(probability = 0.5) {
  // 0.1 is 10% probability of getting true
  // 0.2 is 20% probability of getting true
  // 0.5 is 50% probability of getting true
  // 0.8 is 80% probability of getting true
  // 0.9 is 90% probability of getting true
  return Math.random() < probability;
}

function getRandomDate(startDt, endDt) {
  return new Date(
    startDt.getTime() + Math.random() * (endDt.getTime() - startDt.getTime()),
  );
}

function getRandomAlphaNumeric(length = 10) {
  return randomstring.generate({
    length,
    charset: 'alphanumeric',
    capitalization: 'lowercase',
  });
}

function getRandomAlphaNumericUpperCase(length = 10) {
  return randomstring.generate({
    length,
    charset: 'alphanumeric',
    capitalization: 'uppercase',
  });
}

function getRandomArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomArrayElements(array, numElements) {
  return _.sampleSize(array, numElements);
}

function getFileKey(module, ...args) {
  const fileKey = constants.fileKeys[module];
  return fileKey.replace(/{(\d+)}/g, (match, index) => args[index]);
}

function replaceTestEmails(emails) {
  if (_.isNil(emails)) {
    return [];
  }

  const replacedEmails = emails.map((i) => {
    if (i.includes('test.Blog.com')) {
      i = accessEnv('REPLACE_TEST_EMAIL', constants.email.replaceTestEmail);
    }
    return i;
  });
  return _.uniq(replacedEmails);
}

function reconcileEmails(toEmails, ccEmails) {
  return _.differenceWith(ccEmails, toEmails, _.isEqual);
}

function getGeneratePdfOptions() {
  // https://peter.sh/experiments/chromium-command-line-switches/
  // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
  return {
    args: [
      '--headless',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-certificate-errors',
    ],
    format: 'A4',
    margin: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    },
    printBackground: true,
  };
}

function replaceTemplatePlaceholderValues(template, placeholders) {
  return template.replace(/\[(.*?)\]/g, (match) => placeholders[match.slice(1, -1)]);
}

function removeFileSync(filePath) {
  // delete the file in tmp folder
  try {
    fs.unlinkSync(filePath);
  } catch (fileErr) {
    console.error(fileErr);
  }
}

// 
const isArrayInsideArray = (parentArray, childArray) => childArray.every((item) =>
  parentArray.includes(item)
);

const generateRandomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let result = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};

export default {
  generateRandomString,
  isArrayInsideArray,
  returnHttpSuccess,
  returnHttpErrorForbidden,
  returnErrorResponse,
  getHeaderAuthorization,
  getCookieOptions,
  getDateFilterCondition,
  getValidationParam,
  getServerTempFileNameWithPath,
  convertToBoolean,
  convertToNumber,
  getRandomNumber,
  getRandomNumberByLength,
  getRandomBoolean,
  getRandomDate,
  getRandomAlphaNumeric,
  getRandomAlphaNumericUpperCase,
  getRandomArrayElement,
  getRandomArrayElements,
  displayDate,
  isWithinHours,
  isDateInRange,
  displayUtcDateTimeWithYear,
  displayCurrency,
  getFileKey,
  isBefore,
  isAfter,
  getTodayDate,
  replaceTestEmails,
  reconcileEmails,
  getFromDateTime,
  getToDateTime,
  isDateBetween,
  getMonthYearLabel,
  isValidDate,
  isValidFutureDate,
  getUtcDate,
  getGeneratePdfOptions,
  replaceTemplatePlaceholderValues,
  removeFileSync,
  validateStartAndEndDate,
};
