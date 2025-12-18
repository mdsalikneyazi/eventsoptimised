// Test script for file upload endpoint
require('dotenv').config();
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Your JWT token from login (replace with your actual token if it expired)
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk0MGZkZGY1MGYxNDBlMTY1MmRjMGYxIiwicm9sZSI6InN1cGVyX2FkbWluIiwiY2x1YklkIjoiNjk0MGZkZGY1MGYxNDBlMTY1MmRjMGVmIn0sImlhdCI6MTc2NTg2NzQyOCwiZXhwIjoxNzY2Mjk5NDI4fQ.3xmI3yIAqv4M2o7ZJzP9qvSXeKLaZqx8g4jdgP-gg-U';

const testUpload = async () => {
  try {
    // Create a simple test image file (1x1 pixel PNG)
    const testImagePath = path.join(__dirname, 'test-image.png');
    
    // If test image doesn't exist, create a minimal PNG
    if (!fs.existsSync(testImagePath)) {
      // Minimal 1x1 pixel PNG in base64
      const minimalPng = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
      );
      fs.writeFileSync(testImagePath, minimalPng);
      console.log('✅ Created test image file');
    }

    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(testImagePath));
    form.append('caption', 'Test post from upload script');

    // Make the request
    console.log('📤 Uploading file to /api/posts/create...');
    console.log('Using token:', TOKEN.substring(0, 20) + '...');
    
    const response = await axios.post('http://localhost:5000/api/posts/create', form, {
      headers: {
        'x-auth-token': TOKEN,
        ...form.getHeaders()
      }
    });

    console.log('\n✅ Upload successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('\n❌ Upload failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received. Is the server running?');
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
  }
};

testUpload();
