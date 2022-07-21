// external imports
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

// internal imports
const sendEmail = require("../services/emailServices");
const emailTemplate = require("../services/emailTemplate");
const { createUser, findUser } = require("../services/userServices");
const UserDto = require("../dtos/UserDto");

// create new user controller
const createNewUser = async (req, res, next) => {
  try {
    const { firstName, lastName, number, address, email, password } = req.body;
    const profile = req.files[0].filename;

    // generate 6 digit verity code
    const verifyCode = crypto.randomInt(100000, 999999);

    // hash password
    const hashedPassword = await bcrypt.hash(password, 11);

    // create new user
    const user = await createUser({
      firstName,
      lastName,
      number,
      address,
      email,
      password: hashedPassword,
      profile,
      verifyCode,
    });

    if (user) {
      // send email verify code
      const info = sendEmail({
        to: email,
        from: "mdm326040@gmail.com",
        subject: "PS Coffee Verify Account",
        text: `mdm326040@gmail.com shared verify code.`,
        html: emailTemplate({
          emailFrom: "mdm326040@gmail.com",
          verifyAccountLink: `${process.env.HOST}/api/v1/auth/verify?user_id=${user._id}&verify_code=${verifyCode}`,
          verifyCode,
        }),
      });

      if (info) {
        const userDto = new UserDto(user);
        res
          .status(201)
          .json({ message: "User Created Successfully!", user: userDto });
      } else {
        throw createError("Not Sending email, something went wrong");
      }
    } else {
      throw createError("User not created! please try again");
    }
  } catch (err) {
    next(err);
  }
};

// verify account controller
const verifyAccount = async (req, res, next) => {
  try {
    let { user_id, verify_code } = req.query;

    // data validation
    if (!user_id || !verify_code) {
      throw createError(404, "User ID & Verify Code Required!");
    }

    // find user with userId
    const user = await findUser("_id", user._id);

    // user check validation
    if (!user) {
      throw createError(404, "User Not Found!");
    }

    // user account status not pending throw error
    if (user.accountStatus !== "pending") {
      throw createError(404, "Your Account Already Verified!!");
    }

    // check verify code valid or invalid
    if (user.verifyCode.toString() === verify_code.toString()) {
      user.accountStatus = "active";

      await user.save();

      return res
        .status(200)
        .json({ message: "Account Verify Successfully!", user });
    } else {
      throw createError(404, "Verify Code don't match!!");
    }
  } catch (err) {
    next(err);
  }
};

// login account controller
const loginAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find user with email
    const user = await findUser("email", email);

    if (!user) {
      throw createError(404, "Invalid Credentials!!");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword) {
      // check user accountStatus
      if (user.accountStatus === "active") {
        // generate jwt token object
        const userPayload = new UserDto(user);

        const token = jwt.sign({ ...userPayload }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        // response token
        res.status(200).json({ message: "Login Successfully!", token });
      } else {
        throw createError(
          404,
          "Your account not active, please active your account!!"
        );
      }
    } else {
      throw createError(404, "Invalid Credentials!!");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewUser,
  verifyAccount,
  loginAccount,
};
