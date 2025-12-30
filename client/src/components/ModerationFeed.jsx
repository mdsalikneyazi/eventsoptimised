import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaExclamationTriangle, FaSearch, FaEye } from 'react-icons/fa';

const ModerationFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch ALL posts (using the public feed endpoint)
  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts/feed');
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching feed:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("⚠️ ADMIN ACTION: Are you sure you want to forcibly remove this post?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/posts/${postId}`, {
        headers: { 'x-auth-token': token }
      });
      
      // Remove from UI immediately
      setPosts(posts.filter(post => post._id !== postId));
      alert("Post removed successfully.");
    } catch (err) {
      alert("Failed to delete post: " + (err.response?.data?.msg || err.message));
    }
  };

  // Filter posts by Club Name or Caption
  const filteredPosts = posts.filter(post => 
    post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="text-white text-center py-8">Loading Network Activity...</div>
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-500" /> 
          Global Moderation Feed
        </h2>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search content or club..." 
            className="bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500 w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredPosts.length === 0 ? (
          <p className="text-zinc-500 text-center py-8">
            {searchTerm ? `No posts found matching "${searchTerm}"` : "No posts found."}
          </p>
        ) : (
          filteredPosts.map(post => (
            <div key={post._id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex gap-4 hover:border-zinc-700 transition-colors group">
              {/* Media Thumbnail */}
              <div className="w-24 h-24 flex-shrink-0 bg-zinc-900 rounded overflow-hidden">
                {post.mediaType === 'video' ? (
                  <video src={post.mediaUrl} className="w-full h-full object-cover" />
                ) : post.mediaType === 'raw' || post.mediaType === 'document' ? (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                    <FaExclamationTriangle className="text-zinc-500 text-2xl" />
                  </div>
                ) : (
                  <img src={post.mediaUrl} alt="Post" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-indigo-400 truncate">{post.user?.name || 'Unknown Club'}</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p className="text-zinc-300 mt-2 text-sm line-clamp-2">
                      {post.caption || <span className="italic text-zinc-500">No caption</span>}
                    </p>
                    <span className="inline-block mt-2 text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                      {post.mediaType}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      onClick={() => window.open(post.mediaUrl, '_blank')}
                      className="text-zinc-400 hover:text-white p-2 border border-zinc-700 bg-zinc-900 rounded transition opacity-0 group-hover:opacity-100"
                      title="View Full Post"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 hover:text-red-400 p-2 border border-red-500/20 bg-red-500/10 rounded transition hover:bg-red-500/20"
                      title="Force Delete Post"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ModerationFeed;

