import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ClubCard = ({ club }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="
        relative flex flex-col h-full bg-gradient-to-br from-zinc-900/95 via-zinc-800/80 to-zinc-900/95
        border border-zinc-800/50 rounded-3xl overflow-hidden
        shadow-sm hover:shadow-lg hover:shadow-indigo-500/20
        transition-all duration-300 group
      "
    >
      {/* Banner */}
      <div 
        className="h-28 bg-zinc-800 relative bg-cover bg-center"
        style={{ backgroundImage: club.bannerUrl ? `url(${club.bannerUrl})` : 'linear-gradient(to right, #27272a, #18181b)' }}
      >
        {/* Club Logo */}
        <div className="absolute -bottom-10 left-6">
          <img 
            src={club.logoUrl || `https://ui-avatars.com/api/?name=${club.name}&background=random`} 
            alt={club.name} 
            loading="lazy"
            className="
              w-20 h-20 rounded-xl border-4 border-zinc-900 object-cover bg-zinc-800
              transition-opacity duration-500 opacity-90 hover:opacity-100
            "
          />
        </div>
      </div>

      <div className="pt-12 px-6 pb-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {club.name}
          </h3>
          {club.category && (
            <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 uppercase">
              {club.category}
            </span>
          )}
        </div>

        <p className="text-zinc-400 text-sm line-clamp-2 mb-6 flex-1">
          {club.description || "A community for students passionate about this field."}
        </p>

        <Link 
          to={`/clubs/${club._id}`}
          className="
            block w-full py-2 text-center text-sm font-bold text-white bg-indigo-500/20
            rounded-lg hover:bg-indigo-500 hover:text-white transition-colors
          "
        >
          View Details
        </Link>
      </div>

      {/* Optional Featured Badge */}
      {club.isFeatured && (
        <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
          Featured
        </div>
      )}
    </motion.div>
  );
};

export default ClubCard;
