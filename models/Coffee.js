const { Schema, model } = require("mongoose");

const coffeeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    coffeeTypes: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
      required: false,
    },
    ratings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Coffee = model("Coffee", coffeeSchema);

module.exports = Coffee;
