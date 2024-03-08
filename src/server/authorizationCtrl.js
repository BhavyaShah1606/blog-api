// authorization for all services

import * as userErrors from '../helpers/userErrors.js';

const authorizationCtrl = (...roles) => (req, res, next) => {
  const { user } = req;

  if (roles && roles.length === 0 && !roles.includes(user.role.tag)) {
    return next(
      new userErrors.ForbiddenError(
        null,
        'Unauthorized access. User cannot perform this operation.',
      ),
    );
  }

  return next();
};

export default authorizationCtrl;
