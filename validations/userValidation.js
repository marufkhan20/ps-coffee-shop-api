// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../models/User");

// check user validation
const userValidation = [
  check("firstName")
    .isLength({ min: 2 })
    .withMessage("First Name is Required!!")
    .trim(),
  check("number")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number mus be a valid Bangladeshi mobile number!!")
    .trim(),
  check("address")
    .isLength({ min: 3 })
    .withMessage("Address is Required!!")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email Address!!")
    .trim()
    .custom(async (email) => {
      try {
        const user = await User.findOne({ email });

        if (user) {
          throw createError("Email already is use!!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
];

// user error validation handler
const userValidationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    // pass the next middleware
    next();
  } else {
    // remove uploaded avatar
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => console.log(err)
      );
    }

    // response errors
    res.status(400).json({ errors: mappedErrors });
  }
};

// login validation
const loginValidation = [
  check("email").isEmail().withMessage("Please Provide Your Valid Email!!").trim(),
  check("password").isLength({ min: 2 }).withMessage("Password is required!!"),
];

// login validation error handler
const loginValidationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response errors
    res.status(400).json({ errors: mappedErrors });
  }
};

module.exports = {
  userValidation,
  userValidationErrorHandler,
  loginValidation,
  loginValidationErrorHandler,
};
