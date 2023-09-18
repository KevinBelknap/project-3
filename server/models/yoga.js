const { Schema, model } = require("mongoose");

const Yoga = new Schema(
  {
    type: {
      type: String,
      default: "yoga",
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 30
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

const yoga = model("Yoga", Yoga);

module.exports = yoga;
