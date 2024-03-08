
import utils from '../../helpers/utils.js';
import userRepository from '../../repositories/userRepository.js';
import * as userErrors from '../../helpers/userErrors.js';
import enums from '../../helpers/enums.js';

// login as an user
export default async function login(req, res, next) {
  try {
    const { phone } = req.body;
    const existingUser = await userRepository.getUserByPhone(phone);
    if (existingUser && existingUser.status !== enums.userStatus.inactive) {
      await userRepository.generateOtp(existingUser.userId, phone);
      return utils.returnHttpSuccess(res, { userId: existingUser.userId });  
    }
    else {
      return next(new userErrors.BadRequestError(phone, ` The phone number ${phone} is either inactive or not registered.`));
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
}
