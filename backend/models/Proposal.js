const mongoose = require("mongoose");

const options = { timestamps: true };

const proposalSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
      required: true,
    },

    listing: {
      type: String,
      required: true,
    },

    listingOwner: {
      type: String,
      required: true,
    },

    isByMilestone: {
      type: Boolean,
      required: true,
    },

    proposalRate: {
      type: Number,
      required: true,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
    },

    isAccepted: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  options
);

const Proposal = mongoose.model("proposal", proposalSchema);

module.exports = Proposal;
