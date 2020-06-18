const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    default: true
  },
  email: {
    type: String,
    default: true
  },
  password: {
    type: String,
    default: true
  },
});

module.exports = mongoose.model('admins', adminSchema)