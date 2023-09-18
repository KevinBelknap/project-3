const { Schema, model } = require("mongoose");

const Swimming = new Schema(
  {
    type: {
      type: String,
      default: "swimming",
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    lapsCount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

const swimming = model("Swimming", Swimming);

module.exports = swimming;
