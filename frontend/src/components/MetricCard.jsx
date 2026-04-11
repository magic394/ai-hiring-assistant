// src/components/MetricCard.jsx
import { motion } from 'framer-motion';

const colorVariants = {
  blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  green: 'from-green-500/20 to-green-600/20 border-green-500/30',
  purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
};

export default function MetricCard({ title, value, icon: Icon, trend, suffix = '', color = 'blue' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${colorVariants[color]} backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-6 w-6 text-white/60" />
        {trend && (
          <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">
        {value}{suffix}
      </h3>
      <p className="text-sm text-white/60">{title}</p>
    </motion.div>
  );
}