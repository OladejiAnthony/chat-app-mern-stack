const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    //the person who sends the message
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //the receiver
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messageType: {
    type: String,
    enum: ["text", "image"],
  },
  message: String,
  imageUrl: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;

