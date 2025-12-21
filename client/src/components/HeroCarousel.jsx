import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroCarousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Auto-Rotation Logic (Change slide every 5 seconds)
  useEffect(() => {
    if (posts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [posts]);

  if (!posts || posts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950 text-zinc-500">
        No activities yet...
      </div>
    );
  }

  const currentPost = posts[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950">
      
      {/* 2. The Background Image/Video */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }} // Slow, cinematic fade
          className="absolute inset-0 w-full h-full"
        >
          {currentPost.mediaType === 'video' ? (
            <video
              src={currentPost.mediaUrl}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover opacity-60" // Dim video slightly
            />
          ) : (
            <img
              src={currentPost.mediaUrl}
              alt="Club Event"
              className="w-full h-full object-cover opacity-60"
            />
          )}
          
          {/* Gradient Overlay (Makes text readable) */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 3. The Text Overlay (Like your reference image) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pt-20">
        
        {/* Animated Club Name Badge */}
        <motion.span 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={currentPost._id + "-badge"} // Re-animate on change
          className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-400 uppercase border border-indigo-500/30 rounded-full bg-zinc-900/50 backdrop-blur-sm"
        >
          @{currentPost.clubId?.name || "Campus Club"}
        </motion.span>

        {/* Big Headline */}
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          key={currentPost._id + "-title"}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl"
        >
          {currentPost.caption || "Experience Campus Life"}
        </motion.h1>

        {/* Call to Action */}
        <Link
          to="/events"
          className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-indigo-50 transition-colors inline-block"
        >
          Explore Events
        </Link>

      </div>

      {/* 4. Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-zinc-400 uppercase tracking-widest">Scroll to Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
      </div>

    </div>
  );
};

export default HeroCarousel;

