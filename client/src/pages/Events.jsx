import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const LIMIT = 6;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/events?page=${page}&limit=${LIMIT}`);
        setEvents(prev => [...prev, ...res.data]);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <div className="max-w-4xl mx-auto pt-4">

        {/* Header */}
        <div className="mb-8 px-2">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-zinc-400 text-sm">
            See what's happening across campus.
          </p>
        </div>

        {loading && events.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 animate-pulse">
            Loading Events...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.length > 0 ? (
                events.map(event => (
                  <EventCard key={event._id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
                  <p className="text-zinc-500">
                    No events scheduled right now.
                  </p>
                </div>
              )}
            </div>

            {/* Load More (logic only, no design change) */}
            {!loading && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="text-sm text-zinc-500 hover:text-white transition"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
