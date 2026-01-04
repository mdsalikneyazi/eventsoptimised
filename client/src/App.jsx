import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClubsDirectory from './pages/ClubsDirectory';
import ClubProfile from './pages/ClubProfile';
import Events from './pages/Events';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500 selection:text-white flex flex-col">
        <Navbar />
        
        {/* Main Content Area - Grows to push footer down */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clubs" element={<ClubsDirectory />} />
            <Route path="/clubs/:id" element={<ClubProfile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </div>

        {/* 🌟 ANIMATED FOOTER START 🌟 */}
        <footer className="relative mt-20 border-t border-white/5 bg-black/20 backdrop-blur-md">
          {/* Glowing Top Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center gap-3">
            
            <p className="flex items-center gap-2 text-zinc-500 font-medium tracking-wide text-sm hover:text-zinc-300 transition-colors duration-300 cursor-default">
              Made with 
              {/* Beating Heart Animation */}
              <span className="animate-pulse text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                ❤️
              </span> 
              by
            </p>

            {/* Name with Gradient & Hover Float Effect */}
            <a 
              href="https://www.instagram.com/sakshm.05/" // Change this to your link!
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-6 py-2 rounded-full bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:-translate-y-1"
            >
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all">
                Saksham
              </span>
              
              {/* Little shine effect */}
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>

            <div className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] mt-2">
              JIIT Club Network © 2026
            </div>
          </div>
        </footer>
        {/* 🌟 ANIMATED FOOTER END 🌟 */}

      </div>
    </Router>
  );
}

export default App;