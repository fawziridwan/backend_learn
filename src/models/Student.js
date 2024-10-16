// models/User.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true,
    unique: false
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},{
  versionKey: false // This will prevent `__v` from being added to the document
});

module.exports = mongoose.model('Student', StudentSchema);
