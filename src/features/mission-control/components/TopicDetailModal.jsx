import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getDailyHours,
  getMonthlyHours,
  getTopicDistribution,
  getWeeklyHours,
} from "../utils/analytics";
import { formatDuration, formatHoursLong } from "../utils/time";
import { getLevelInfo } from "../utils/leveling";
import SimpleBarChart from "./SimpleBarChart";
import SimpleDonutChart from "./SimpleDonutChart";

export default function TopicDetailModal({ topic, stats, sessions, onClose }) {
  if (!topic || !stats) return null;

  const levelInfo = getLevelInfo(stats.totalMs);
  const topicSessions = sessions.filter((s) => s.topic === topic);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] border border-gray-200 bg-white p-8 shadow-[0_20px_80px_rgb(0,0,0,0.12)] zen-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Topic Analytics</p>
              <h3 className="text-4xl font-extrabold tracking-tight text-black mt-1">{topic}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-bold hover:bg-gray-50"
            >
              Close
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="Lifetime" value={formatHoursLong(stats.totalMs)} />
            <Metric label="Level" value={levelInfo.level} />
            <Metric label="Sessions" value={stats.sessionCount} />
            <Metric label="Longest" value={formatDuration(stats.longestSession)} />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <ChartCard title="Daily Hours">
              <SimpleBarChart data={getDailyHours(topicSessions, 14)} />
            </ChartCard>
            <ChartCard title="Weekly Hours">
              <SimpleBarChart data={getWeeklyHours(topicSessions, 8)} color="#06b6d4" />
            </ChartCard>
            <ChartCard title="Monthly Hours">
              <SimpleBarChart data={getMonthlyHours(topicSessions, 6)} color="#10b981" />
            </ChartCard>
            <ChartCard title="Distribution">
              <SimpleDonutChart data={getTopicDistribution(topicSessions)} />
            </ChartCard>
          </div>

          <div className="mt-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Recent Sessions</h4>
            <div className="space-y-2">
              {topicSessions.slice(0, 8).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-gray-700">{s.date}</span>
                  <span className="font-bold">{formatDuration(s.durationMs)}</span>
                </div>
              ))}
              {!topicSessions.length && (
                <p className="text-gray-400 text-sm">No sessions yet for this topic.</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="mt-1 text-xl font-black text-black">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{title}</h4>
      {children}
    </div>
  );
}
