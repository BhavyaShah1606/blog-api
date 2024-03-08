import HttpStatus from 'http-status-codes';

import constants from '../helpers/constants.js';
import utils from '../helpers/utils.js';
import * as baseErrors from '../helpers/baseErrors.js';

const { ApplicationError } = baseErrors;

const logPrefix = `${constants.logging.logPrefix} [ErrorCtrl]`;

// generic error handler
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses

const errorCtrl = (err, req, res, next) => {
  try {
    // first should be param and then name
    const param = err.param || err.name;

    if (err instanceof ApplicationError) {
      console.error(
        `${logPrefix}: [ApplicationError] [${err.statusCode}] ${JSON.stringify(
          err,
        )}`,
      );

      res
        .status(err.statusCode)
        .send(utils.returnErrorResponse(param, err.message));
    } else {
      console.error(`${logPrefix}: [GenericError]`, err);

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(utils.returnErrorResponse(param, err.message));
    }
  } catch (error) {
    console.error(`${logPrefix}: [InternalServerError] ${error}`);

    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(
        `${logPrefix}: [InternalServerError] An unknown error occured: ${error}`,
      );
  }
};

export default errorCtrl;
