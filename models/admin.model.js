const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetCode: {
    type: String,
    default: ''
  },
  expire: {
    type: Date,
    default: ''
  }
});

module.exports = mongoose.model('admins', adminSchema)