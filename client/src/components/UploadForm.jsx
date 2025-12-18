import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Success or Error message

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file first.');

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);

    const token = localStorage.getItem('token');
    console.log("🚀 SENDING: Token is:", token); // <--- ADD THIS
    console.log("🚀 SENDING: File is:", file);   // <--- ADD THIS
    console.log("🚀 SENDING: Caption is:", caption); // <--- ADD THIS

    try {
      // The Magic Request
      // FORCE the browser to use IPv4 (bypasses localhost confusion)
      console.log("🚀 SENDING: About to make axios.post request...");
      const response = await axios.post('http://127.0.0.1:5000/api/posts/create', formData, {
        headers: {
          'x-auth-token': token // Only send the token - Axios handles Content-Type automatically
        }
      });
      console.log("✅ RECEIVED: Response from server:", response.data);

      setMessage('Upload Successful!');
      setFile(null);
      setCaption('');
      // Clear the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      // Optional: clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);

    } catch (err) {
      console.error("❌ ERROR: Upload failed:", err);
      console.error("❌ ERROR: Response:", err.response);
      console.error("❌ ERROR: Message:", err.message);
      setMessage(err.response?.data?.msg || 'Upload Failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      
      {/* Success/Error Notification */}
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-3 rounded-lg text-center font-bold text-sm ${
            message.includes('Success') 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* File Input Zone */}
        <div className="relative group">
          <input 
            type="file" 
            onChange={handleFileChange}
            accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors ${
            file ? 'border-indigo-500 bg-indigo-500/5' : 'border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800'
          }`}>
            {file ? (
              <>
                <FaCheckCircle className="text-3xl text-indigo-500 mb-2" />
                <span className="text-sm text-indigo-300 font-medium truncate max-w-xs">{file.name}</span>
              </>
            ) : (
              <>
                <FaCloudUploadAlt className="text-3xl text-zinc-500 mb-2 group-hover:text-zinc-400" />
                <span className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400">Click to upload image, video, or doc</span>
              </>
            )}
          </div>
        </div>

        {/* Caption Input */}
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption for this post..."
          rows="3"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${
            loading 
              ? 'bg-zinc-700 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20'
          }`}
        >
          {loading ? (
            <><FaSpinner className="animate-spin" /> Uploading...</>
          ) : (
            'Post Update'
          )}
        </button>

      </form>
    </div>
  );
};

export default UploadForm;

