import login from './login.js';
import renewSession from './renewSession.js';
import signup from './signup.js';
import verifyOtp from './verifyOtp.js';

export default class AuthCtrl {
  static login = login;
  static signup = signup;
  static verifyOtp = verifyOtp;
  static renewSession = renewSession;

}
