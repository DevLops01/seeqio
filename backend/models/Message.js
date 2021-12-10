const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
      required: true,
    },

    recipient: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

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

    read: {
      type: Boolean,
      required: true,
      default: false,
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
