// src/pages/Dashboard.jsx
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { UsersIcon, StarIcon, CheckCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchCandidates } from '../api/candidates';
import MetricCard from '../components/MetricCard';
import RecentCandidates from '../components/RecentCandidates';

export default function Dashboard() {
  const { data: candidates, isLoading } = useQuery('candidates', fetchCandidates);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const metrics = {
    total: candidates?.length || 0,
    shortlisted: candidates?.filter(c => c.status === 'shortlisted').length || 0,
    averageScore: Math.round(candidates?.reduce((acc, c) => acc + c.score, 0) / (candidates?.length || 1)),
    interviewRate: candidates ? Math.round((candidates.filter(c => c.status === 'shortlisted').length / candidates.length) * 100) : 0,
  };

  const chartData = candidates?.map(c => ({
    name: c.name.split(' ')[0],
    score: c.score,
  })) || [];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Total Candidates"
          value={metrics.total}
          icon={UsersIcon}
          trend="+12%"
          color="blue"
        />
        <MetricCard
          title="Shortlisted"
          value={metrics.shortlisted}
          icon={CheckCircleIcon}
          trend="+5%"
          color="green"
        />
        <MetricCard
          title="Average Score"
          value={metrics.averageScore}
          icon={StarIcon}
          suffix="/100"
          color="purple"
        />
        <MetricCard
          title="Interview Rate"
          value={metrics.interviewRate}
          icon={ChartBarIcon}
          suffix="%"
          color="orange"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <RecentCandidates candidates={candidates?.slice(0, 5)} />
        </motion.div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-2xl p-6 h-32" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl p-6 h-96" />
        <div className="bg-white/5 rounded-2xl p-6 h-96" />
      </div>
    </div>
  );
}