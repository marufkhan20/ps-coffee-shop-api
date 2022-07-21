// internal imports
const User = require("../models/User");

// create new user
const createUser = async ({
  firstName,
  lastName,
  number,
  address,
  email,
  password,
  profile,
  verifyCode,
}) => {
  const user = new User({
    firstName,
    lastName,
    number,
    address,
    email,
    password,
    profile,
    verifyCode,
  });

  await user.save();
  return user;
};

// findUserById
const findUser = async (key, value) => {
  return await User.findOne({ [key]: value });
};

module.exports = { createUser, findUser };
