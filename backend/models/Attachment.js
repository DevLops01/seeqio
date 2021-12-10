const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },

    keyId: {
      type: String,
      required: true,
    },

    creator: {
      type: String,
      required: true,
    },

    listing: {
      type: String,
      required: true,
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

const Attachment = mongoose.model("attachment", attachmentSchema);

module.exports = Attachment;
