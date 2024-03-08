import _ from 'lodash';

import utils from '../../helpers/utils.js';
import userRepository from '../../repositories/userRepository.js';
import * as userErrors from '../../helpers/userErrors.js';
import enums from '../../helpers/enums.js';

// login as an user
export default async function signup(req, res, next) {
  try {

    let userDetail = req.body;

    const existingUser = await userRepository.getUserByPhone(userDetail.phone);
    console.log(existingUser);
    if (existingUser && !existingUser.status !== enums.userStatus.inactive) {
      return next(new userErrors.BadRequestError(userDetail.phone, `Phone: ${userDetail.phone} is already registered.`));
    }

    // Create a new instance of UserDetailModel and assign values
    userDetail = {
      ...userDetail,
      birthDate: new Date(userDetail.birthDate),
      status: enums.userStatus.pending,
      registrationDate: new Date(),
    };
    console.log(userDetail);
    const { userId } = await userRepository.createUserDetail(userDetail);
    await userRepository.generateOtp(userId, userDetail.phone);
    return utils.returnHttpSuccess(res, { userId });
  } catch (err) {
    console.error(err);
    return next(err);
  }
}
