import { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha"; // <--- 1. Import This

const ApplicationModal = ({ clubId, clubName, onClose }) => {
  const [formData, setFormData] = useState({ studentName: '', studentEmail: '', rollNumber: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null); // <--- 2. Add State for Token

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. Prevent submission if Captcha is not checked
    if (!captchaToken) {
      setMessage('❌ Please verify you are not a robot.');
      return;
    }

    setLoading(true);
    try {
      // 4. Send captchaToken to backend
      await axios.post('/api/applications/apply', { 
        ...formData, 
        clubId,
        captchaToken 
      });
      
      setMessage('✅ Application Sent!');
      setTimeout(onClose, 2000);
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.msg || 'Failed to submit'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-11/12 max-w-md p-6 relative shadow-2xl mx-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Join {clubName}</h2>
        <p className="text-zinc-400 text-sm mb-6">Fill out this form to apply.</p>

        {message && !message.includes('robot') ? (
          <div className={`p-4 rounded-lg text-center font-bold mb-4 ${message.includes('Sent') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && message.includes('robot') && (
               <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded text-center text-sm font-bold">
                 {message}
               </div>
            )}

            <input required placeholder="Full Name" className="w-full bg-zinc-950 border-none rounded-2xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} />
            
            <input required type="email" placeholder="College Email" className="w-full bg-zinc-950 border-none rounded-2xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              value={formData.studentEmail} onChange={e => setFormData({...formData, studentEmail: e.target.value})} />
            
            <input required placeholder="Roll Number" className="w-full bg-zinc-950 border-none rounded-2xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
              value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value})} />
            
            <textarea required placeholder="Why do you want to join?" rows="3" className="w-full bg-zinc-950 border-none rounded-2xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none transition-all"
              value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />

            {/* 👇 5. Add the ReCAPTCHA Component Here */}
            <div className="flex justify-center my-2">
              <ReCAPTCHA
                sitekey="6LeqNjMsAAAAAOwKQVKWznFISnDZ_uf7xnoMFqCT" // Replace with your actual Site Key if different
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              />
            </div>

            <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
              {loading ? 'Sending...' : <><FaPaperPlane /> Submit Application</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;