const enums = {
  environment: {
    localhost: 'localhost',
    development: 'development',
    staging: 'staging',
    production: 'production',
  },
  jwtTokenType: {
    session: 1,
    refresh: 2,
    forgotPassword: 3,
  },
  otpStatus: {
    valid: 200,
    invalid: 400,
    expired: 401,
  },
  userStatus: {
    active: 'Active',
    inactive: 'In Active',
    pending: 'Pending',
  },
  blogStatus: {
     Draft:1,
    Published: 2,
    Archived: 3,
  },
};

export default enums;
