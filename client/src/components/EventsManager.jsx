import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarPlus, FaTrash, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    registrationLink: '', // 👈 Add this
  });
  const [msg, setMsg] = useState('');

  // 1. Fetch My Events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/events/my-events', {
        headers: { 'x-auth-token': token }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events");
    }
  };

  // 2. Create Event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/events/create', formData, {
        headers: { 'x-auth-token': token }
      });
      setMsg('✅ Event Scheduled!');
      setFormData({ title: '', description: '', date: '', location: '', registrationLink: '' });
      fetchEvents(); 
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('❌ Failed to create event');
    }
  };

  // 3. Delete Event
  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this event?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setEvents(events.filter(ev => ev._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-8"> {/* CHANGED: Vertical Stack instead of Grid */}
      
      {/* SECTION 1: Create Form */}
      <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaCalendarPlus className="text-indigo-500" /> Schedule New Event
        </h3>
        
        {msg && <div className="mb-4 p-2 bg-indigo-500/20 text-indigo-300 rounded text-center text-sm font-bold">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Event Title" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" 
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4">
            <input required type="datetime-local" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none text-sm" 
              value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            
            <input required placeholder="Location" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" 
              value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>

          <textarea required placeholder="Event Details..." rows="3" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none resize-none" 
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">
              Registration Link (Optional)
            </label>
            <input
              type="url"
              name="registrationLink"
              placeholder="https://forms.google.com/..."
              value={formData.registrationLink}
              onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
            />
            <p className="text-xs text-zinc-600 mt-1">
              Paste your Google Form or Luma link here. Leave empty if no registration needed.
            </p>
          </div>

          <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors">
            Publish Event
          </button>
        </form>
      </div>

      {/* SECTION 2: Upcoming List */}
      <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">Your Upcoming Events</h3>
        
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {events.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 italic bg-zinc-900/50 rounded-lg border border-dashed border-zinc-800">
              No upcoming events scheduled.
            </div>
          ) : (
            events.map(ev => (
              <div key={ev._id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex justify-between items-center group hover:border-zinc-600 transition-colors">
                <div>
                  <h4 className="font-bold text-white text-lg">{ev.title}</h4>
                  <div className="text-sm text-zinc-400 mt-1 flex gap-4">
                    <span className="flex items-center gap-1 text-indigo-400">
                      <FaClock /> {new Date(ev.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <FaMapMarkerAlt /> {ev.location}
                    </span>
                  </div>
                </div>
                
                <button onClick={() => handleDelete(ev._id)} className="p-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default EventsManager;