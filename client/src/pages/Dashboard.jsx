import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Kick them out if no token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Club Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-500 text-sm font-bold uppercase">Total Posts</h3>
            <p className="text-4xl font-bold text-white mt-2">12</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-500 text-sm font-bold uppercase">Pending Applications</h3>
            <p className="text-4xl font-bold text-indigo-400 mt-2">5</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
             <h3 className="text-zinc-500 text-sm font-bold uppercase">Members</h3>
             <p className="text-4xl font-bold text-emerald-400 mt-2">142</p>
          </div>
        </div>

        {/* Content Area - Split into Upload Form and Recent List (Future) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: The Upload Form */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-6">Create New Post</h2>
            <UploadForm />
          </div>

          {/* Right: Placeholder for "My Recent Posts" */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-600">
            <div className="text-center">
              <p>Recent Post Management</p>
              <p className="text-xs mt-2">(Coming in Phase 2)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;

