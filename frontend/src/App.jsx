import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume_url: ''
  });

  const WEBHOOK_URL = 'https://digifyz.app.n8n.cloud/webhook/hire/candidate';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success('Application submitted! Check your email.');
        setFormData({ name: '', email: '', resume_url: '' });
      } else {
        toast.error('Submission failed. Please try again.');
      }
    } catch (error) {
      toast.error('Submission failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              AI Hiring Assistant
            </h1>
            <p className="text-gray-400 text-lg">
              Powered by n8n Cloud + OpenAI + Google Sheets
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Live Demo
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                Production Ready
              </span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Resume URL (Google Drive)</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/.../view"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={formData.resume_url}
                  onChange={(e) => setFormData({...formData, resume_url: e.target.value})}
                />
                <p className="text-gray-500 text-sm mt-2">
                  Upload resume to Google Drive → Share → Copy link
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-all disabled:opacity-50"
              >
                {loading ? 'AI Analyzing...' : 'Submit Application'}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>AI analyzes resume → Scores (0-100) → Shortlists → Sends email → Logs to Google Sheets</p>
            <p className="mt-2">⚡ Built with n8n Cloud + React + Cloudflare Pages </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
