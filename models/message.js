const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    uid: {
      type: String,
      required: true,
      trim: true,
    },
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  room: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
