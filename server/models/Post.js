const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  clubId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Club', 
    required: true 
  },
  mediaUrl: { 
    type: String, 
    required: true 
  }, // This will store the Cloudinary link
  mediaType: { 
    type: String, 
    enum: ['image', 'video', 'document'], 
    default: 'image' 
  },
  caption: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Post', PostSchema);

