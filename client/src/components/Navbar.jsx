import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tighter text-white">
            CAMPUS<span className="text-indigo-500">CLUBS</span>
          </Link>

          {/* Right Side Links */}
          <div className="flex items-center space-x-6">
            <Link to="/clubs" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Directory
            </Link>
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
              Admin Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

