import Sequelize from 'sequelize';
import dbConfig from '../config/dbConfig.js';

const sequelize = new Sequelize(dbConfig, {
  logging: false,
  dialectOptions: {
    multipleStatements: true,
    options: {
      useUTC: true,
      dateFirst: 1
    }
  },
});

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Don't remove For Hosted Server config:
// const sequelize = new Sequelize('database', null, null, {
//     dialect: 'mssql',
//     dialectOptions: {
//       authentication: {
//         type: 'ntlm',
//         options: {
//           domain: 'yourDomain',
//           userName: 'username',
//           password: 'password'
//         }
//       },
//       options: {
//         instanceName: 'SQLEXPRESS'
//       }
//     }
//   })


export default sequelize;
