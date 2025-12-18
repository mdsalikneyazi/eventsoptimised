const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // We will hash this later
  role: { type: String, enum: ['super_admin', 'club_admin'], default: 'club_admin' },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' } // Which club do they own?
});

module.exports = mongoose.model('Admin', AdminSchema);

