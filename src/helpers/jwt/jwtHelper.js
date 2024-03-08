import jwt from 'jsonwebtoken'; // Make sure to import jwt
import _ from 'lodash'; // Import underscore if you are using it
import constants from '../constants.js'; // Ensure this is correctly imported
import enums from '../enums.js';
import accessEnv from '../accessEnv.js';

class JwtHelper {
  static generateJwtAsync = async (tokenType, userDetail, deviceId = null) => {
    return new Promise((resolve) => {
      const payload = this.getJwtPayload(userDetail, deviceId); // Use `this` to reference static methods
      const authToken = this.generateSessionJwt(tokenType, payload, userDetail.phone);
      resolve(authToken);
    });
  };

  static renewSessionJwtAsync = async (phone, refreshToken) => {
    return new Promise((resolve, reject) => {
      const decodedRefreshToken = this.validateJwt(refreshToken, constants.jwt.audience.refresh);

      if (!_.isNil(decodedRefreshToken)) {
        const payload = this.getJwtPayload(decodedRefreshToken, decodedRefreshToken.deviceId);
        const newSessionToken = this.generateSessionJwt(
          constants.jwt.audience.session,
          payload,
          phone,
        );
        resolve(newSessionToken);
      }

      reject(
        new userErrors.UnauthorizedError(
          null,
          'Authentication tokens are invalid.',
        ),
      );
    });
  };

  static validateJwt(token, audience, ignoreExpiration = false) {
    const publicKey = global.jwtPublicKey; // Ensure global.jwtPublicKey is defined

    const verifyOptions = {
      issuer: constants.jwt.issuer,
      audience,
      algorithm: constants.jwt.algorithm,
      clockTolerance: 20,
      ignoreExpiration,
    };

    try {
      const decodedToken = jwt.verify(token, publicKey, verifyOptions);
      return decodedToken;
    } catch (err) {
      console.error(err);
      throw new userErrors.UnauthorizedError(
        err.param || err.name,
        `[${audience}] ${err}`,
      );
    }
  }

  static generateSessionJwt = (tokenType, payload, subject) => {
    const envJwtSessionTokenExpiryInSecs = accessEnv('JWT_SESSION_TOKEN_EXPIRY_IN_SECS',
      constants.jwt.sessionTokenExpiryInSecs);
    const envJwtRefreshTokenExpiryInSecs = accessEnv('JWT_REFRESH_TOKEN_EXPIRY_IN_SECS',
      constants.jwt.refreshTokenExpiryInSecs,
    );

    let audience = constants.jwt.audience.session;
    let expiresIn = parseInt(envJwtSessionTokenExpiryInSecs, 10);

    if (Number.isNaN(expiresIn)) {
      expiresIn = constants.jwt.sessionTokenExpiryInSecs;
      console.error(
        'generateSessionJwt: ERROR: NaN sessionTokenExpiry value, setting it to default: %d',
        expiresIn,
      );
    }

    if (tokenType === enums.jwtTokenType.refresh) {
      audience = constants.jwt.audience.refresh;
      expiresIn = parseInt(envJwtRefreshTokenExpiryInSecs, 10);
      if (Number.isNaN(expiresIn)) {
        expiresIn = constants.jwt.refreshTokenExpiryInSecs;
        console.error(
          'generateSessionJwt: ERROR: NaN refreshTokenExpiry value, setting it to default: %d',
          expiresIn,
        );
      }
    }

    const privateKey = global.jwtPrivateKey;
    const signOptions = {
      issuer: constants.jwt.issuer,
      subject,
      audience,
      expiresIn,
      algorithm: constants.jwt.algorithm,
    };

    const authToken = jwt.sign(payload, privateKey, signOptions);
    return authToken;

  };

  static getJwtPayload = (user, deviceId) => ({
    id: user.userId,
    name: `${user.firstName} ${user.surName}`,
    emailAddress: user.email,
    phone: user.phone,
    // tenantId: user.tenantId._id
  });
}

export default JwtHelper;
