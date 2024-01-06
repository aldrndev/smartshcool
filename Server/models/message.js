const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  content: String,
  status: {
    type: String,
    enum: ['Read', 'Unread'],
    default: 'Unread',
  },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
