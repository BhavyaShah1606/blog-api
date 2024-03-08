// validation middleware to handle request data for all services
import { validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';
import _ from 'lodash';

const validateSchemaCtrl = (schemas) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array();
  errors.forEach((error, index) => {
    errors[index] = _.omit(errors[index], ['value', 'location']);
    if (_.isObject(errors[index].msg)) {
      (errors[index].msg = _.get(errors[index], 'msg.errorMessage')),
        _.get(errors[index], 'msg.dynamicValues');
    }
  });

  return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
    success: false,
    errors,
  });
};

export { validateSchemaCtrl };
