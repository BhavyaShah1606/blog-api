
import enums from '../../helpers/enums.js';
import * as userErrors from '../../helpers/userErrors.js';
import utils from '../../helpers/utils.js';
import userRepository from '../../repositories/userRepository.js';
import JwtHelper from '../../helpers/jwt/jwtHelper.js';

// login as an user
export default async function verifyOtp(req, res, next) {
  try {
    const { phone, otp, deviceId } = req.body;
    const otpStatus = await userRepository.verifyOtp(phone, otp, deviceId);

    if (otpStatus === enums.otpStatus.expired) {
      return next(
        new userErrors.ForbiddenError(
          null,
          'Otp is expired. Please regenerate OTP.',
        ),
      );
    }

    if (otpStatus === enums.otpStatus.invalid) {
      return next(new userErrors.BadRequestError('otp', `Invalid OTP.`));
    }

    const userDetail = await userRepository.getUserByPhone(phone);
    userDetail.phone = phone;
    const response = {
      session: await JwtHelper.generateJwtAsync(enums.jwtTokenType.session, userDetail, null),
      refresh: await JwtHelper.generateJwtAsync(enums.jwtTokenType.refresh, userDetail),
      user: {
        email: userDetail.email,
        phone: phone,
        name: `${userDetail.firstName} ${userDetail.surName}`,
        userId: userDetail.userId,
      }
    };
    return utils.returnHttpSuccess(res, response);

  } catch (err) {
    console.error(err);
    return next(err);
  }
}
