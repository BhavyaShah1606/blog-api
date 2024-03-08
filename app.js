import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import createError from 'http-errors';
import _ from 'lodash';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// environment variables (this needs to be set early)
import 'dotenv/config.js';

// other app imports
import tokenUtils from './src/helpers/jwt/tokenUtils.js';
import errorCtrl from './src/server/errorCtrl.js';

import accessEnv from './src/helpers/accessEnv.js';
import constants from './src/helpers/constants.js';
import enums from './src/helpers/enums.js';
import setupRoutes from './src/server/routesCtrl.js';

// https://www.decodingweb.dev/dirname-is-not-defined-in-es-module-scope-fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nodeEnvironment = `.env.${process.env.NODE_ENV || 'development'}`;

console.log(`Blog: Directory name: ${__dirname}`);
console.log(`Blog: Node environment: ${nodeEnvironment}`);

dotenv.config({
  debug: true,
  path: path.resolve(__dirname, nodeEnvironment),
  override: true,
});

// default app
const app = express();

const initialize = async () => { 

  app.use(
    cors({
      origin(origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (_.isNull(origin) || _.isUndefined(origin) || origin === 'null') {
          return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) === -1) {
          console.log('Allowed origins:', allowedOrigins);

          const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
          return callback(new Error(msg), false);
        }

        return callback(null, true);
      },
      credentials: true,
      preflightContinue: true,
      exposedHeaders: [
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
      ],
      optionsSuccessStatus: 200,
    }),
  );

 
  // parse body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/json' }));

  // other middlewares
  app.use(compression());
  app.use(logger('dev'));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());

  // authentication and authorization
  app.use(helmet());
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: accessEnv('SESSION_SECRET', constants.session.secret),
    }),
  );

  // setup all routes
  setupRoutes(app);

  // set global cache for jwt tokens
  tokenUtils.setJwtTokens();

  // sentry error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // global error handler
  app.use(errorCtrl);

  // sentry (optional) fallthrough error handler
  app.use((err, req, res, next) => {
    const env = req.app.get('env');
    if (
      env === enums.environment.localhost ||
      env === enums.environment.development
    ) {
      res.locals.message = err.message;
      res.locals.error = err;
    } else {
      // the error id is attached to `res.sentry` to be returned
      // and optionally displayed to the user for support.
      res.statusCode = 500;
      res.end(`${res.sentry}\n`);
    }
  });

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

initialize();

export { app };
