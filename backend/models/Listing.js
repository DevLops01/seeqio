const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      maxlength: 100,
    },

    clientRating: {
      type: Number,
      required: true,
      default: 0,
    },

    payType: {
      type: String,
      enum: ["hourly, fixed"],
      required: true,
    },

    payRate: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    proposals: [
      {
        type: String,
      },
    ],

    experienceLevel: {
      type: String,
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

    requiredSkills: [
      {
        type: String,
        required: true,
      },
    ],

    jobDuration: {
      type: String,
      required: true,
    },

    seeqs: {
      type: Number,
      required: true,
    },

    funded: {
      type: Boolean,
      required: true,
      default: false,
    },

    openings: {
      type: Number,
      required: true,
      default: 1,
    },

    hires: {
      type: Number,
      default: 0,
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

const Listing = mongoose.model("job-listing", listingSchema);

module.exports = Listing;
