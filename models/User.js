const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (e) {
          return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            e
          );
        },
        message: (prop) => `Invalid Email: ${prop.value}`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["user", "admin", "manager", "creator", "deliveryMan"],
      default: ["user"],
    },
    accountStatus: {
      type: String,
      enum: ["active", "pending", "reject", "disable"],
      default: "pending",
    },
    verifyCode: {
      type: Number,
      required: true,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
