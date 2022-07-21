// external imports
const router = require("express").Router();

// internal imports
const {
  createNewUser,
  verifyAccount,
  loginAccount,
} = require("../controllers/authControllers");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  userValidation,
  userValidationErrorHandler,
  loginValidation,
  loginValidationErrorHandler,
} = require("../validations/userValidation");

// create new user
router.post(
  "/register",
  avatarUpload,
  userValidation,
  userValidationErrorHandler,
  createNewUser
);

// verify account
router.get("/verify", verifyAccount);

// login account
router.post(
  "/login",
  loginValidation,
  loginValidationErrorHandler,
  loginAccount
);

module.exports = router;
