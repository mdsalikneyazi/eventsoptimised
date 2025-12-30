const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  // 👇 NEW FIELD
  registrationLink: {
    type: String, 
    default: '' // Optional, in case they don't have a form
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);