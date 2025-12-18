import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500 selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clubs" element={<div className="pt-24 text-center">Clubs Directory Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
