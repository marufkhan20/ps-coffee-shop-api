// external imports
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const { findUser } = require("../../services/userServices");

// admin auth middleware
const adminAuthMiddleware = async (req, res, next) => {
  try {
    // get token to authorization headers
    let token = req.headers.authorization;

    if (token) {
      // remove the bearer string
      token = token.split(" ")[1];

      // decode the data from jwt token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // check decoded data valid or invlaid
      if (decoded) {
        // find user with user id
        const user = await findUser("_id", decoded.id);

        // check user valid or invalid
        if (user) {
          // check user account status
          if (user.accountStatus === "active") {
            // check roles
            if (user.roles.includes("admin")) {
              req.admin = user;
              next();
            } else {
              throw createError(404, "this api access only admin");
            }
          } else {
            throw createError(
              404,
              "Your account not activated, please active your account!!"
            );
          }
        } else {
          throw createError(404, "User not found!!");
        }
      } else {
        throw createError(404, "Invalid Token!!");
      }
    } else {
      throw createError(404, "Please Login Your Account and Try Again!!");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = adminAuthMiddleware;
