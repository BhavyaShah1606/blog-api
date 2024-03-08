import enums from '../helpers/enums.js';
import DeviceModel from '../models/deviceModel.js';
import UserDetailModel from '../models/userDetailModel.js';
import UserOTPModel from '../models/userOtpModel.js';

export default class UserRepository {
  static getUserById = async (id) => UserDetailModel.findByPk(id);

  static getUserByPhone = async (phone) => UserDetailModel.findOne({
    where: {
      phone,
    },
    attributes: ['userId', 'firstName', 'surName', 'email'],
    order: [['userId', 'DESC']],
    raw: true, // if object read only then raw should be true.
  });

  static createUserDetail = async (userDetail) => {
    return await UserDetailModel.create(userDetail);
  };

  static generateOtp = async (userId, phone) => {

    const otp = '9999';// Math.floor(1000 + Math.random() * 9000).toString();

    // Set the expiration time for the OTP (e.g., 5 minutes from now)
    const expiryDateTime = new Date();
    expiryDateTime.setMinutes(expiryDateTime.getMinutes() + 10);

    // Create a new OTP entry in the UserOTP table
    await UserOTPModel.create({
      userId: userId,
      phone: phone,
      otp,
      expiryDateTime,
      createdDateTime: new Date(),
    });
  };

  static verifyOtp = async (phone, otp, deviceId) => {

    // Retrieve the latest OTP entry for the user
    const latestOTP = await UserOTPModel.findOne({
      where: {
        phone,
        otp
      },
      order: [['createdDateTime', 'DESC']],
    });

    if (latestOTP) {
      // Check if the provided OTP matches the stored OTP
      if (new Date() < latestOTP.expiryDateTime) {

        // Update the user's status to 'Active' or your desired status
        await UserDetailModel.update(
          {
            deviceId: deviceId,
            status: enums.userStatus.active,
            lastUpdatedOn: new Date(), lastLoginOn: new Date()
          },
          {
            where: {
              userId: latestOTP.userId,
            },
          }
        );
        return enums.otpStatus.valid;
      } else {
        return enums.otpStatus.expired;
      }
    } else {
      return enums.otpStatus.invalid;
    }
  };

}