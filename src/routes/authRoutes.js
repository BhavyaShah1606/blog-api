import { Router } from 'express';

import authCtrl from '../controllers/auth/index.js';
import { validateSchemaCtrl } from '../server/validatorCtrl.js';
import authSchema from '../validators/authSchema.js';

const router = Router();

// post: login
router.post('/auth/login',
  [
    validateSchemaCtrl(authSchema.loginSchema)
  ],
  async (req, res, next) => authCtrl.login(req, res, next));

// post: signup
router.post('/auth/signup',
  [
    validateSchemaCtrl(authSchema.userDetailSchema)
  ],
  async (req, res, next) => authCtrl.signup(req, res, next));


// post: verify otp
router.post('/auth/verify-otp',
  [
    validateSchemaCtrl(authSchema.otpSchema)
  ],
  async (req, res, next) => authCtrl.verifyOtp(req, res, next));

// post: renew token
router.post('/auth/renew',
  [
    validateSchemaCtrl(authSchema.renewSessionSchema)
  ],
  async (req, res, next) => authCtrl.renewSession(req, res, next));

 

export default router;
