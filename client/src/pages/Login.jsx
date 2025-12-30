import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUniversity, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      if (res.data.role) localStorage.setItem('userRole', res.data.role);

      if (res.data.mustChangePassword) {
        navigate('/change-password');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-zinc-900 rounded-3xl mb-4 shadow-2xl shadow-indigo-900/10">
            <FaUniversity className="text-3xl text-indigo-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p className="text-zinc-500 mt-2 text-sm">Admin access for club managers</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl mb-6 text-center text-sm font-bold border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* 🌟 SOFT INPUTS */}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-900 text-white rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
              placeholder="Email Address"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="w-full bg-zinc-900 text-white rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
              placeholder="Password"
            />
          </div>

          {/* 🌟 BIG BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-2xl hover:bg-zinc-200 transition-transform active:scale-95 shadow-lg shadow-white/5 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Signing In...' : <>Sign In <FaArrowRight size={14} /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-600 text-xs">
          Only authorized club leads can log in. <br/>
          <Link to="/" className="text-indigo-500 hover:underline">Return to Directory</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
