const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId ,ref:'users'},
  message: String,
  like: Array,
  dateCreation: Date
});

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;