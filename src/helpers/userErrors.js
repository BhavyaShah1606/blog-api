// all user generated errors for the services
import HttpStatus from 'http-status-codes';

import { UserError } from './baseErrors.js';

// unauthorized error
class UnauthorizedError extends UserError {
  constructor(param, message, activityLogId = null) {
    super(param, message, activityLogId);
    if (activityLogId) {
      (async () => {
        // await dbUtils.updateErrorActivityLogAsync(param, message, activityLogId);
      })();
    }
  }

  get statusCode() {
    return HttpStatus.UNAUTHORIZED;
  }
}

// bad request error
class BadRequestError extends UserError {
  constructor(param, message, activityLogId = null) {
    super(param, message, activityLogId);
    if (activityLogId) {
      (async () => {
        // await dbUtils.updateErrorActivityLogAsync(param, message, activityLogId);
      })();
    }
  }

  get statusCode() {
    return HttpStatus.BAD_REQUEST;
  }
}

// not found error
class NotFoundError extends UserError {
  constructor(param, message, activityLogId = null) {
    super(param, message, activityLogId);
    if (activityLogId) {
      (async () => {
        // await dbUtils.updateErrorActivityLogAsync(param, message, activityLogId);
      })();
    }
  }

  get statusCode() {
    return HttpStatus.NOT_FOUND;
  }
}

// unprocessable entity error
class UnprocessableEntityError extends UserError {
  constructor(param, message, activityLogId = null) {
    super(param, message, activityLogId);
    if (activityLogId) {
      (async () => {
        // await dbUtils.updateErrorActivityLogAsync(param, message, activityLogId);
      })();
    }
  }

  get statusCode() {
    return HttpStatus.UNPROCESSABLE_ENTITY;
  }
}

// forbidden error
class ForbiddenError extends UserError {
  constructor(param, message, activityLogId = null) {
    super(param, message, activityLogId);
    if (activityLogId) {
      (async () => {
        // await dbUtils.updateErrorActivityLogAsync(param, message, activityLogId);
      })();
    }
  }

  get statusCode() {
    return HttpStatus.FORBIDDEN;
  }
}

export {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
  ForbiddenError,
};
