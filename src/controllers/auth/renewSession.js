import enums from '../../helpers/enums.js';
import jwtHelper from '../../helpers/jwt/jwtHelper.js';
import utils from '../../helpers/utils.js';
import userRepository from '../../repositories/userRepository.js';

export default async function renewSession(req, res, next) {
  try {
    const { phone, refreshToken } = req.body;
    const user = await userRepository.getUserByPhone(phone);
    if (user.status === enums.userStatus.active) {
      return await jwtHelper.renewSessionJwtAsync(phone, refreshToken)
        .then(async (newSessionToken) => utils.returnHttpSuccess(res, {
          token: {
            session: newSessionToken,
          }
        }))
        .catch(async (err) => {
          console.error(err);
          const errorMessage = `Renewing session token for phone ${phone} failed. Error: ${err}`;
          return utils.returnHttpErrorForbidden(res, null, errorMessage);
        });
    }
    else {
      return next(new userErrors.BadRequestError('phone', `User is not active.`));
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
}