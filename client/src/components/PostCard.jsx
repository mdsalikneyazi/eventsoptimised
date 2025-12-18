import { motion } from 'framer-motion';
import { FaFilePdf, FaFileWord, FaFileAlt, FaDownload } from 'react-icons/fa';

const PostCard = ({ post }) => {
  
  // 1. Helper to determine file icon for docs
  const getFileIcon = (url) => {
    if (url.includes('.pdf')) return <FaFilePdf className="text-red-500 text-4xl mb-2" />;
    if (url.includes('.doc')) return <FaFileWord className="text-blue-500 text-4xl mb-2" />;
    return <FaFileAlt className="text-gray-400 text-4xl mb-2" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors"
    >
      
      {/* --- MEDIA RENDERER --- */}
      <div className="aspect-video w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
        
        {/* Case A: Video */}
        {post.mediaType === 'video' && (
          <video 
            src={post.mediaUrl} 
            controls 
            className="w-full h-full object-cover"
          />
        )}

        {/* Case B: Image */}
        {post.mediaType === 'image' && (
          <img 
            src={post.mediaUrl} 
            alt="Post content" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        )}

        {/* Case C: Documents (PDFs/Word docs) */}
        {(post.mediaType === 'document' || post.mediaType === 'raw') && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            {getFileIcon(post.mediaUrl)}
            <span className="text-sm text-zinc-400 truncate w-32">Document</span>
            <a 
              href={post.mediaUrl} 
              target="_blank" 
              rel="noreferrer"
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-xs font-bold text-white flex items-center gap-2 transition-colors"
            >
              <FaDownload /> DOWNLOAD
            </a>
          </div>
        )}
      </div>

      {/* --- CAPTION & FOOTER --- */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
            @{post.clubId?.name || "Club"}
          </span>
          <span className="text-xs text-zinc-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <p className="text-sm text-zinc-300 line-clamp-2">
          {post.caption || "No caption provided."}
        </p>
      </div>

    </motion.div>
  );
};

export default PostCard;

