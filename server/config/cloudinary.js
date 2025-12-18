const cloudinaryLib = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

// 1. Configure Cloudinary with your keys
// Note: Cloudinary cloud names typically don't have spaces
// If you get errors, check your Cloudinary dashboard for the exact cloud name
cloudinaryLib.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(), // Trim whitespace
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary configured with cloud_name:', process.env.CLOUDINARY_CLOUD_NAME?.trim());

// 2. Define Storage Settings
// Pass the full cloudinary object (not just v2) because multer-storage-cloudinary needs cloudinary.v2
const storage = cloudinaryStorage({
  cloudinary: cloudinaryLib, // Pass the full object so it can access .v2
  params: (req, file) => {
    // Check if the file is a document (PDF, Word, etc.)
    // These need to be stored as 'raw' so they don't get processed as images
    let resourceType = 'auto'; // Default for images/videos
    
    if (file.mimetype === 'application/pdf' || 
        file.mimetype.includes('word') || 
        file.mimetype.includes('document') ||
        file.mimetype.includes('presentation') ||
        file.mimetype.includes('spreadsheet')) {
      resourceType = 'raw';
    }

    return {
      folder: 'college_clubs',
      // Add document formats
      allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'gif', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'],
      resource_type: resourceType,
    };
  },
});

// 3. Initialize Multer
const upload = multer({ storage: storage });

module.exports = { upload };

