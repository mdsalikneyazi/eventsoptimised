import { memo } from 'react';
import { FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventCard = memo(function EventCard({ event }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all flex flex-col h-full relative group">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>

      <div className="p-6 flex-1 flex flex-col z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-zinc-800 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-zinc-700">
            {new Date(event.date).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            })}
          </div>

          {event.user && (
            <Link
              to={`/clubs/${event.user._id}`}
              className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs transition bg-black/40 px-2 py-1 rounded-full"
            >
              {event.user.logoUrl && (
                <img
                  src={event.user.logoUrl}
                  alt="Logo"
                  loading="lazy"
                  className="w-4 h-4 rounded-full object-cover"
                />
              )}
              <span className="font-medium">{event.user.name}</span>
            </Link>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
          {event.title}
        </h3>

        <p className="text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
          {event.description}
        </p>

        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white text-black font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95 mb-4 shadow-lg shadow-white/5"
          >
            <FaExternalLinkAlt size={12} /> Register Now
          </a>
        )}

        <div className="flex items-center gap-4 text-xs text-zinc-500 border-t border-zinc-800/50 pt-4">
          <div className="flex items-center gap-1">
            <FaClock />
            {new Date(event.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt />
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EventCard;
