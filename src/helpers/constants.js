// all constants for the services
const constants = {
  // MySql Connection:
  mysqlOptions: {
    appKey: 'E946C8MF278CD5931769B722E695D8F2',
    dbHost: '192.168.1.7',
    dbPort: '1433',
    dbUser: 'dev',
    dbPassword: 'El@ncy1!',
    dbName: 'CJSales-Dev',
    dbDialect: 'mssql',
  },
  jwt: {
    issuer: 'CJSales',
    algorithm: 'RS256',
    sessionTokenExpiryInSecs: 3600, // 1 hour (for now)
    refreshTokenExpiryInSecs: 86400, // 3 days
    audience: {
      session: 'session-token',
      refresh: 'refresh-token',
    },
    publicKeyFile: 'jwt.public.key',
    privateKeyFile: 'jwt.private.key',
  },
  session: {
    secret: 'ZidbW60D8Zp55fHHSVATFZLYuJ767htba84yqLhcHM8Of9IePLGDsVWBxTCWlNRU',
  },

  general: {
    apiVersion: '1.0.0',
    uuidVersion4: 4,
    emptyGuid: '00000000-0000-0000-0000-000000000000',
    expireDayLimit: 7,
    apiDateFormat: 'YYYY-MM-DD',
  },
  errorMessage: {
    permissionDenied: 'Permission denied to perform this operation.'
  },
  unicode: {
    bull: '\u2022',
    dash: '\u2014',
    space: '\u00A0',
  },
  logging: {
    logPrefix: '🚀 BlogJR',
    logLevel: 'debug',
    logLineSize: 256,
    logFileSize: '50m',
  },
  password: {
    hashKeyLength: 64,
  },
  token: {
    hashKeyLength: 32,
  },
  auth: {
    authorization: 'authorization',
    bearer: 'bearer',
    automationKey: 'x-Blog-automationkey',
  },
  apiHeaderKey: {
    activitySource: 'activity-source',
  },

  security: {
    pin: {
      hashKeyLength: 32,
    },
  },
  webPortal: {
    baseUrl: 'http://localhost:5000',
    dashboardUrl:
      'http://localhost:5000',
    maintenance500Url:
      'http://localhost:5000',
  },
  file: {
    contentType: {
      pdf: 'application/pdf',
      jpeg: 'image/jpeg',
      xlsx: 'application/excel',
      csv: 'text/csv',
    },
    tmpDirectory: '/tmp',
  },
  notificationSetting: {
    sound: 'default',
  },
  dataFormatType: {
    email: 'email',
    date: 'date',
  },
  fileKeys: {
    imports: 'customer-{0}/{1}/user-{2}/{3}/{4}',
  },
};

export default constants;
