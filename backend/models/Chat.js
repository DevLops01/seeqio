const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    // attachments: [
    //   {
    //     originalName: {
    //       type: String,
    //       required: true,
    //     },
    //
    //     keyId: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],

    title: {
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

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
