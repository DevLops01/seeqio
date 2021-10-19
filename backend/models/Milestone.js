const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    freelancer: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    listing: {
      type: String,
      required: true,
    },
    proposal: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    funded: {
      type: Boolean,
      required: true,
      default: false,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Milestone = mongoose.model("milestone", milestoneSchema);

module.exports = Milestone;
