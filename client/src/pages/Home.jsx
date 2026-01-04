import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaUsers } from 'react-icons/fa';

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [slides, setSlides] = useState([]); // 🌟 Stores Real Post Images
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. Fetch Clubs & Real Posts for Slideshow
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clubsRes, postsRes] = await Promise.all([
          axios.get('/api/auth/clubs'),
          axios.get('/api/posts/feed')
        ]);

        setClubs(clubsRes.data);

        // 🌟 LOGIC: Filter for Images Only (No videos) & Take Top 5
        const validSlides = postsRes.data
          .filter(post => post.mediaType === 'image' && post.mediaUrl)
          .map(post => post.mediaUrl)
          .slice(0, 5);

        // Fallback: If no clubs have posted images yet, use a nice default
        if (validSlides.length === 0) {
          setSlides(["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070"]);
        } else {
          setSlides(validSlides);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        // Fallback on error
        setSlides(["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070"]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Auto-Advance Slideshow (Only if we have multiple slides)
  useEffect(() => {
    if (slides.length <= 1) return; 
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* ========================================= */}
      {/* 🌟 HERO SECTION (REAL DATA)               */}
      {/* ========================================= */}
      <div className="relative h-[450px] md:h-[600px] w-full overflow-hidden mb-8 group bg-zinc-900">
        
        {/* A. DESKTOP SLIDESHOW (Crossfade) */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide} 
                alt="Club Activity" 
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[8000ms]" 
              />
              {/* Cinematic Scrim (Overlay) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
            </div>
          ))}
        </div>

        {/* B. MOBILE STATIC HERO (Latest Image) */}
        <div className="md:hidden absolute inset-0 w-full h-full">
            {slides.length > 0 && (
              <img 
                src={slides[0]} 
                alt="Latest Club Activity" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black"></div>
        </div>

        {/* C. HERO CONTENT LAYER */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 mt-10">
          <div className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6 backdrop-blur-md uppercase shadow-xl animate-fadeIn">
            @Campus Clubs
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl tracking-tight">
            Find Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Community
            </span>
          </h1>
          
          <p className="text-zinc-200 max-w-lg text-sm md:text-lg mb-8 font-medium drop-shadow-md">
            Explore {clubs.length} student-run clubs, join exclusive events, and build your campus legacy.
          </p>
          
          {/* Soft Search Bar */}
          <div className="relative w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
            <FaSearch className="absolute left-5 top-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search for clubs..." 
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full py-3.5 pl-14 pr-6 text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-black/40 transition-all shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 🌟 DIRECTORY GRID (Mobile Optimized)      */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaUsers className="text-indigo-500" /> Directory
          </h2>
          <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
            {filteredClubs.length} Active Clubs
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500 animate-pulse">Loading Directory...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <Link to={`/clubs/${club._id}`} key={club._id} className="group block">
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:bg-zinc-900 transition-all active:scale-95 duration-200 shadow-lg hover:shadow-indigo-500/10">
                  
                  {/* Banner Area - removed overflow-hidden so the logo can float out */}
                  <div className="h-36 bg-zinc-800 relative">
                    {club.bannerUrl ? (
                      <img src={club.bannerUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
                    )}
                    {/* Floating Logo */}
                    <div className="absolute -bottom-6 left-4">
                      <div className="w-16 h-16 rounded-2xl bg-black p-1 border border-zinc-800 shadow-2xl group-hover:border-indigo-500/50 transition-colors">
                        {club.logoUrl ? (
                          <img src={club.logoUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <div className="w-full h-full bg-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold">
                            {club.name[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-10 pb-5 px-5">
                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors truncate">
                      {club.name}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1 line-clamp-2 min-h-[40px] leading-relaxed">
                      {club.description || "No description provided yet."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
