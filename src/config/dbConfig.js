import accessEnv from '../helpers/accessEnv.js';
import constants from '../helpers/constants.js';

const dbConfig = `${accessEnv('DB_DIALECT', constants.mysqlOptions.dbDialect)}://${accessEnv('DB_USER', constants.mysqlOptions.dbUser)}:${accessEnv('DB_PASSWORD', constants.mysqlOptions.dbPassword)}@${accessEnv('DB_HOST', constants.mysqlOptions.dbHost)}:${accessEnv('DB_PORT', constants.mysqlOptions.dbPort)}/${accessEnv('DB_DB', constants.mysqlOptions.dbName)}`;

export default dbConfig;
