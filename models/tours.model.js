const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: {
    type: String,
    default: true
  },
  desc: {
    type: String,
    default: true
  },
  discount: {
    type: String,
    default: true
  },
  price: {
    type: Number,
    default: true
  },
  people: {
    type: Number,
    default: true
  },
  duration: {
    type: String,
    default: true
  },
  img: {
    type: String,
    default: true
  },
});

module.exports = mongoose.model('tours', tourSchema) 