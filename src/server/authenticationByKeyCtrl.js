import constants from '../helpers/constants.js';
import * as userErrors from '../helpers/userErrors.js';
import configHelper from '../helpers/configHelper.js';

const { UnauthorizedError, BadRequestError } = userErrors;

const authenticationByKeyCtrl = (req, res, next) => {
  const automationKeyHeader = req.headers[constants.auth.automationKey];

  if (automationKeyHeader) {
    const { customerConfigs } = configHelper.getInstance();

    const customerConfig = customerConfigs.find((config) => config.settings.automationKeys.find((key) => (
      key.apiKey === automationKeyHeader && !key.isDeleted && key.isActive
    )));

    if (!customerConfig) {
      return next(
        new BadRequestError(null, 'Automation key is not found or invalid.'),
      );
    }

    req.automationKey = {
      apiKey: automationKeyHeader,
      customerId: customerConfig._id,
    };

    return next();
  }

  return next(
    new UnauthorizedError(
      null,
      'Automation key is missing, invalid or expired.',
    ),
  );
};

export default authenticationByKeyCtrl;
