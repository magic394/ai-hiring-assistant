
import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            AI Hiring Assistant
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Automate your recruitment process with AI
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-all"
              onClick={() => alert('Dashboard coming soon!')}
            >
              Go to Dashboard
            </button>
            <button 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all border border-white/20"
              onClick={() => alert('Submit candidate form coming soon!')}
            >
              Submit Candidate
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-8">
            Powered by n8n + OpenAI + React
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
