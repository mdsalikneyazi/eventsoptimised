import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUniversity, FaList, FaCalendarAlt, FaChartPie, FaSignOutAlt, FaSignInAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasUnreadEvents, setHasUnreadEvents] = useState(false);

  // Detect scroll for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔔 Check unread events (lightweight)
  useEffect(() => {
    const checkUnreadEvents = async () => {
      try {
        const lastSeen = localStorage.getItem('eventsLastSeen') || 0;
        const res = await fetch('/api/events?limit=1');
        const data = await res.json();

        if (data?.length > 0) {
          const latest = new Date(data[0].createdAt).getTime();
          setHasUnreadEvents(latest > lastSeen);
        }
      } catch {
        // silent fail
      }
    };

    checkUnreadEvents();

    const markRead = () => setHasUnreadEvents(false);
    window.addEventListener('eventsRead', markRead);

    return () => window.removeEventListener('eventsRead', markRead);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActive = (path) =>
    location.pathname === path ? 'text-indigo-500' : 'text-zinc-400';

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex items-center justify-between px-6 py-3 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 transition-all duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaUniversity className="text-2xl text-indigo-500" />
          <span className="text-xl font-bold tracking-tight">
            CAMPUS<span className="text-indigo-500">CLUBS</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className={`relative font-medium ${isActive('/')}`}>
            Directory
          </Link>

          {/* Events with pink dot */}
          <Link to="/events" className={`relative font-medium ${isActive('/events')}`}>
            Events
            {hasUnreadEvents && (
              <span className="absolute -top-1 -right-3 w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse" />
            )}
          </Link>

          {token ? (
            <>
              <Link to="/dashboard" className={`relative font-medium ${isActive('/dashboard')}`}>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              Admin Login
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <Link to="/" className="flex items-center gap-2">
          <FaUniversity className="text-xl text-indigo-500" />
          <span className="text-lg font-bold tracking-tight">
            CAMPUS<span className="text-indigo-500">CLUBS</span>
          </span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars size={22} />
        </button>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
            <FaList size={20} />
            <span className="text-[10px] font-medium">Directory</span>
          </Link>

          {/* Mobile Events with pink dot */}
          <Link to="/events" className={`relative flex flex-col items-center gap-1 ${isActive('/events')}`}>
            <FaCalendarAlt size={20} />
            {hasUnreadEvents && (
              <span className="absolute top-1 right-5 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            )}
            <span className="text-[10px] font-medium">Events</span>
          </Link>

          {token ? (
            <>
              <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard')}`}>
                <FaChartPie size={20} />
                <span className="text-[10px] font-medium">Dash</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex flex-col items-center gap-1 text-zinc-500 hover:text-red-500"
              >
                <FaSignOutAlt size={20} />
                <span className="text-[10px] font-medium">Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className={`flex flex-col items-center gap-1 ${isActive('/login')}`}>
              <FaSignInAlt size={20} />
              <span className="text-[10px] font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
