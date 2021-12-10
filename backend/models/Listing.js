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

    payType: {
      type: String,
      enum: ["hourly", "fixed"],
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
        freelancer: {
          type: String,
          unique: false,
          required: false,
        },

        proposalId: {
          type: String,
        },

        submitted: {
          type: Date,
          default: Date.now,
        },

        withdrawn: {
          type: Boolean,
          default: false,
        },
      },
    ],

    experienceLevel: {
      type: String,
      enum: ["entry level", "intermediate", "expert"],
      required: true,
    },

    category: {
      type: String,
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
      enum: ["1 to 3 months", "3 to 6 months", "6 or more months"],
      required: true,
    },

    attachments: {
      type: Array,
      required: false,
      default: [],
    },

    tokensRequired: {
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

    hires: [
      {
        type: String,
      },
    ],

    uuid: {
      type: String,
      required: true,
      unique: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    isDraft: {
      type: Boolean,
      default: true,
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
