const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  logoUrl: { type: String }, // URL from Cloudinary
  instagramLink: { type: String },
  // This helps us link an Admin to a Club
  adminEmail: { type: String, required: true } 
});

module.exports = mongoose.model('Club', ClubSchema);

