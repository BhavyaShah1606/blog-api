// base errors for all the services
class ApplicationError extends Error {
  constructor(param, message, activityLogId) {
    super();
    this.param = param;
    this.message = message;
    this.activityLogId = activityLogId;
  }
}

class DatabaseError extends ApplicationError {
}

class InternalServerError extends ApplicationError {
}

class UserError extends ApplicationError {
}

export {
  ApplicationError,
  DatabaseError,
  InternalServerError,
  UserError
};

