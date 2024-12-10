import {body} from 'express-validator'

export const formValidator = [
    body('username')
      .isLength({ min: 6 })
      .withMessage('Username must be at least 6 characters long'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('firstName')
      .notEmpty()
      .withMessage('First Name is required'),
    body('lastName')
      .notEmpty()
      .withMessage('Last Name is required')
  ]

  