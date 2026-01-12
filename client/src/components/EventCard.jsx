import { memo } from 'react';
import { FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventCard = memo(function EventCard({ event }) {
  return (
    <div
      className="
        relative flex flex-col h-full rounded-3xl overflow-hidden
        bg-gradient-to-br from-zinc-900/95 via-zinc-800/80 to-zinc-900/95
        border border-zinc-800/60
        transition-transform duration-300 ease-out
        hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1
      "
    >
      {/* Gradient overlay decorative top right */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/10 blur-lg pointer-events-none"></div>

      <div className="p-6 flex-1 flex flex-col z-10">
        {/* Date + Club */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/20">
            {new Date(event.date).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            })}
          </div>

          {event.user && (
            <Link
              to={`/clubs/${event.user._id}`}
              className="
                flex items-center gap-2 text-xs font-medium transition-colors
                text-zinc-300 hover:text-white bg-black/30 px-2 py-1 rounded-full
              "
            >
              {event.user.logoUrl && (
                <img
                  src={event.user.logoUrl}
                  alt="Logo"
                  loading="lazy"
                  className="w-5 h-5 rounded-full object-cover transition-opacity duration-500 opacity-90 hover:opacity-100"
                />
              )}
              <span>{event.user.name}</span>
            </Link>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 leading-snug line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
          {event.description}
        </p>

        {/* Register Button */}
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full bg-white text-black font-semibold py-3 rounded-2xl flex items-center justify-center gap-2
              transition-all duration-200 hover:bg-zinc-100 active:scale-95 shadow-md shadow-white/10
            "
          >
            <FaExternalLinkAlt size={12} /> Register Now
          </a>
        )}

        {/* Footer info */}
        <div className="flex items-center gap-4 text-xs text-zinc-400 border-t border-zinc-700/40 pt-4">
          <div className="flex items-center gap-1">
            <FaClock /> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt /> {event.location}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EventCard;
