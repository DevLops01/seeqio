const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("skill", skillSchema);

module.exports = Skill;
