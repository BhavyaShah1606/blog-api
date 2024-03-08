import { body } from 'express-validator';

const loginSchema = [
  body('phone')
    .notEmpty()
    .withMessage('Phone cannot be empty.')
    .isString()
    .withMessage('Phone must be a string.')
    .isLength({ max: 13 })
    .withMessage('Phone cannot exceed 13 characters.'),
];

const userDetailSchema = [
  body('firstName')
    .notEmpty()
    .withMessage('First name cannot be empty.')
    .isString()
    .withMessage('First name must be a string.')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters.'),
  body('surname')
    .notEmpty()
    .withMessage('Surname cannot be empty.')
    .isString()
    .withMessage('Surname must be a string.')
    .isLength({ max: 50 })
    .withMessage('Surname cannot exceed 50 characters.'),
  body('phone')
    .notEmpty()
    .withMessage('Phone cannot be empty.')
    .isString()
    .withMessage('Phone must be a string.')
    .isLength({ max: 13 })
    .withMessage('Phone cannot exceed 13 characters.'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .withMessage('Invalid email.')
    .isString()
    .withMessage('Email must be a string.')
    .isLength({ max: 100 })
    .withMessage('Email cannot exceed 100 characters.'),
  body('postCode')
    .notEmpty()
    .withMessage('Postcode cannot be empty.')
    .isString()
    .withMessage('Postcode must be a string.')
    .isLength({ max: 5 })
    .withMessage('Postcode cannot exceed 5 characters.'),
  body('birthDate')
    .optional({ nullable: true, checkFalsy: true }) // Allow for optional and falsy values
    .isDate()
    .withMessage('Invalid date format for birthDate.'),
];


const otpSchema = [
  body('phone')
    .notEmpty()
    .withMessage('Phone cannot be empty.')
    .isString()
    .withMessage('Phone must be a string.')
    .isLength({ max: 13 })
    .withMessage('Phone cannot exceed 13 characters.'),
  body('otp')
    .notEmpty()
    .withMessage('OTP cannot be empty.')
    .isLength({ min: 4 })
    .withMessage('OTP must contain at least 4 characters.'),
];


const renewSessionSchema = [
  body('phone')
    .notEmpty()
    .withMessage('Phone cannot be empty.')
    .isString()
    .withMessage('Phone must be a string.')
    .isLength({ max: 13 })
    .withMessage('Phone cannot exceed 13 characters.'),
  body('token')
    .notEmpty()
    .withMessage('token cannot be empty.')
];

export default {
  loginSchema, userDetailSchema, otpSchema, renewSessionSchema
};
