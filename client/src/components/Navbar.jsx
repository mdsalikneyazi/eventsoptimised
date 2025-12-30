import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUniversity, FaList, FaCalendarAlt, FaChartPie, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // Helper to color the active tab
  const isActive = (path) => location.pathname === path ? "text-indigo-500" : "text-zinc-500";

  return (
    <>
      {/* 🖥️ DESKTOP TOP BAR (Translucent Glass) */}
      <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 text-white sticky top-0 z-40 hidden md:block transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <FaUniversity className="text-2xl text-indigo-500" />
              <span className="text-xl font-bold tracking-tight">CAMPUS<span className="text-indigo-500">CLUBS</span></span>
            </Link>

            {/* Desktop Links */}
            <div className="flex items-center space-x-8">
              <Link to="/" className={`hover:text-white transition font-medium ${isActive('/')}`}>
                Directory
              </Link>
              
              <Link to="/events" className={`hover:text-white transition font-medium ${isActive('/events')}`}>
                Events
              </Link>

              {token ? (
                <>
                  <Link to="/dashboard" className={`hover:text-white transition font-medium ${isActive('/dashboard')}`}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition">
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 📱 MOBILE TOP BAR (Translucent Logo) */}
      <nav className="md:hidden bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 text-white sticky top-0 z-40 flex items-center justify-center h-14 transition-all">
        <Link to="/" className="flex items-center gap-2">
          <FaUniversity className="text-xl text-indigo-500" />
          <span className="text-lg font-bold tracking-tight">CAMPUS<span className="text-indigo-500">CLUBS</span></span>
        </Link>
      </nav>

      {/* 📱 MOBILE BOTTOM NAV (Fixed Glass Footer) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 z-50 pb-safe transition-all">
        <div className="flex justify-around items-center h-16">
          
          {/* Directory Tab */}
          <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
            <FaList size={20} />
            <span className="text-[10px] font-medium">Directory</span>
          </Link>

          {/* Events Tab */}
          <Link to="/events" className={`flex flex-col items-center gap-1 ${isActive('/events')}`}>
            <FaCalendarAlt size={20} />
            <span className="text-[10px] font-medium">Events</span>
          </Link>

          {/* Dashboard / Auth Tab */}
          {token ? (
            <>
              <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard')}`}>
                <FaChartPie size={20} />
                <span className="text-[10px] font-medium">Dash</span>
              </Link>
              
              <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-red-500">
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

