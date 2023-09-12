const { Schema, model } = require("mongoose");

const Physical = new Schema(
  {
    type: {
      type: String,
      default: "physical",
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    weight: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
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

const physical = model("Physical", Physical);

module.exports = physical;