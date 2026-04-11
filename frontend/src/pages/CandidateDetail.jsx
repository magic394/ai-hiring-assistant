// src/pages/CandidateDetail.jsx
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { PlayIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { fetchCandidateById } from '../api/candidates';
import AudioPlayer from '../components/AudioPlayer';

export default function CandidateDetail() {
  const { id } = useParams();
  const { data: candidate, isLoading } = useQuery(['candidate', id], () => fetchCandidateById(id));

  if (isLoading) {
    return <DetailSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{candidate.name}</h1>
            <p className="text-gray-400">{candidate.email}</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            candidate.status === 'shortlisted' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {candidate.status === 'shortlisted' ? 'Shortlisted' : 'Rejected'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">AI Score</div>
            <div className="text-3xl font-bold text-white">{candidate.score}/100</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Role Fit</div>
            <div className="text-white font-medium">{candidate.role_fit}</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-blue-400" />
              AI Summary
            </h3>
            <p className="text-gray-300 leading-relaxed">{candidate.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Strengths</h3>
              <ul className="space-y-2">
                {candidate.strengths?.map((strength, i) => (
                  <li key={i} className="text-green-400">✓ {strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Areas for Growth</h3>
              <ul className="space-y-2">
                {candidate.weaknesses?.map((weakness, i) => (
                  <li key={i} className="text-yellow-400">⚠ {weakness}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5 text-blue-400" />
              Interview Questions
            </h3>
            <div className="space-y-3">
              {candidate.interview_questions?.map((question, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-300">{i + 1}. {question}</p>
                </div>
              ))}
            </div>
          </div>

          {candidate.voice_url && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <PlayIcon className="h-5 w-5 text-blue-400" />
                Voice Summary
              </h3>
              <AudioPlayer url={candidate.voice_url} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}