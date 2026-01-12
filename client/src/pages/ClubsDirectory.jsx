import { useEffect, useState } from 'react';
import axios from 'axios';
import ClubCard from '../components/ClubCard';
import { FaSearch } from 'react-icons/fa';

const ClubsDirectory = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get('/api/auth/clubs');
        setClubs(res.data);
      } catch (err) {
        console.error("Failed to fetch clubs");
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  // Filter Logic
  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (club.category && club.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (club.description && club.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-zinc-950 pt-14 md:pt-24 px-4 pb-24 md:pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Club Directory</h1>
            <p className="text-zinc-400">Discover and join communities that match your vibe.</p>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search clubs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-white w-full md:w-80 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Horizontal Scroll Container on Mobile / Grid on Desktop */}
        {loading ? (
          <div className="text-white text-center">Loading Directory...</div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Mobile Horizontal Scroll */}
            <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory py-2">
              {filteredClubs.map(club => (
                <div className="snap-start flex-shrink-0 w-64">
                  <ClubCard club={club} />
                </div>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredClubs.map(club => (
                <ClubCard key={club._id} club={club} />
              ))}
            </div>
          </div>
        )}

        {!loading && filteredClubs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No clubs found matching "{searchTerm}"</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClubsDirectory;
