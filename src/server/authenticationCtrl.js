// authentication for all services
import _ from 'lodash';

import utils from '../helpers/utils.js';
import constants from '../helpers/constants.js';
import * as userErrors from '../helpers/userErrors.js';

const { UnauthorizedError, BadRequestError } = userErrors;

const authenticationCtrl = (req, res, next) => {
  const authHeader = req.headers[constants.auth.authorization];

  if (authHeader) {
    const authToken = authHeader.split(' ');
    if (authToken && _.size(authToken) !== 2) {
      return next(
        new BadRequestError(null, 'Authentication session token is invalid.'),
      );
    }

    const ignoreExpiration = _.includes(req.url, 'auth/logout');
    const decodedToken = utils.validateJwt(
      authToken[1],
      constants.jwt.audience.session,
      ignoreExpiration,
    );
    if (decodedToken) {
      req.user = {
        id: decodedToken.id,
        name: decodedToken.name,
        emailAddress: decodedToken.emailAddress,
        role: decodedToken.role,
        customer: decodedToken.customer,
        deviceId: decodedToken.deviceId,
      };

      return next();
    }
  }

  return next(
    new UnauthorizedError(
      null,
      'Authentication session token is missing, invalid or expired.',
    ),
  );
};

export default authenticationCtrl;
