const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    // - User ID - User Object ID
    // - Coffees [ARRAY] - Array
    // - Payment Type - String
    // - Payment Status - Boolean
    // - Total Price - Number
    // - Order Status - String - Enum
    // - Created AT - Date
    // - Updated AT - Date
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coffees: {
      type: Object,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: [
        "order_placed",
        "order_confirmation",
        "preparation",
        "out_for_delivery",
        "complete",
      ],
      default: "order_placed",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
