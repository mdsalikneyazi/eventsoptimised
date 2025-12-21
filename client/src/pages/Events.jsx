import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch ALL public events
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter logic
  const filteredEvents = events.filter(ev => 
    ev.title.toLowerCase().includes(filter.toLowerCase()) || 
    ev.clubId?.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Campus Events</h1>
            <p className="text-zinc-400">Don't miss out on what's happening around you.</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search events or clubs..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-colors"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center text-zinc-500 py-20">Loading calendar...</div>}

        {/* Events Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
                <p className="text-zinc-500 text-lg">No upcoming events found.</p>
              </div>
            ) : (
              filteredEvents.map(ev => (
                <div key={ev._id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all hover:-translate-y-1">
                  
                  {/* Date Badge */}
                  <div className="bg-zinc-800 p-4 border-b border-zinc-700/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {/* Club Logo (Small) */}
                      <img 
                        src={ev.clubId?.logoUrl || `https://ui-avatars.com/api/?name=${ev.clubId?.name}&background=random`} 
                        alt="Club" 
                        className="w-8 h-8 rounded-full bg-zinc-700"
                      />
                      <span className="text-sm font-bold text-zinc-300">{ev.clubId?.name || "Unknown Club"}</span>
                    </div>
                    <div className="text-center bg-zinc-950 px-3 py-1 rounded text-xs font-bold text-indigo-400 border border-zinc-800">
                      {new Date(ev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{ev.title}</h3>
                    
                    <div className="space-y-2 text-sm text-zinc-400 mb-4">
                      <p className="flex items-center gap-2">
                        <FaClock className="text-indigo-500" /> 
                        {new Date(ev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" /> 
                        {ev.location}
                      </p>
                    </div>

                    <p className="text-zinc-500 text-sm line-clamp-3 mb-6 h-14">
                      {ev.description}
                    </p>

                    <Link to={`/clubs/${ev.clubId?._id}`} className="block w-full text-center py-2 bg-zinc-800 hover:bg-white hover:text-black text-white rounded-lg text-sm font-bold transition-colors">
                      View Club Profile
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Events;
