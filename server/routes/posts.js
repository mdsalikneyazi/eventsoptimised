const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { upload } = require('../config/cloudinary'); 
const auth = require('../middleware/auth');

// @route   GET /api/posts/feed
// @desc    Get all posts sorted by newest
// @access  Public
router.get('/feed', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Newest first
      .populate('clubId', 'name logoUrl'); // Get Club Name & Logo too
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/posts/create
// @desc    Upload media and create a post
// @access  Private (Admins Only)
router.post('/create', auth, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary Error:', err);
      return res.status(400).json({ msg: 'File upload error', error: err.message });
    }
    next();
  });
}, async (req, res) => {
  console.log("🔥 HIT: Backend received a request!"); // <--- ADD THIS
  console.log("📂 File info:", req.file);            // <--- ADD THIS
  console.log("👤 User:", req.user);                 // <--- ADD THIS
  
  try {

    // req.file is the file info from Cloudinary
    // req.user is the logged-in admin info (from the token)

    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Determine media type based on file mimetype or resource_type
    let mediaType = 'image';
    const mimetype = req.file.mimetype || '';
    
    if (req.file.resource_type === 'video' || mimetype.startsWith('video')) {
      mediaType = 'video';
    } else if (
      req.file.resource_type === 'raw' ||
      mimetype === 'application/pdf' ||
      mimetype.includes('word') ||
      mimetype.includes('document') ||
      mimetype.includes('presentation') ||
      mimetype.includes('spreadsheet')
    ) {
      mediaType = 'document';
    }

    // Get the Cloudinary URL - it could be in path, url, or secure_url
    const mediaUrl = req.file.path || req.file.url || req.file.secure_url;
    
    if (!mediaUrl) {
      console.error('No mediaUrl found in req.file:', req.file);
      return res.status(500).json({ msg: 'Failed to get media URL from Cloudinary' });
    }

    const newPost = new Post({
      clubId: req.user.clubId, // Automatically link post to the Admin's club
      mediaUrl: mediaUrl,
      mediaType: mediaType,
      caption: req.body.caption
    });

    const post = await newPost.save();
    console.log('Post saved successfully:', post._id);
    res.json(post);

  } catch (err) {
    console.error('Upload Error:', err);
    console.error('Error Stack:', err.stack);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router;

