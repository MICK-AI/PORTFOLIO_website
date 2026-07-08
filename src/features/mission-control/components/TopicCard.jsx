import React from "react";
import { motion } from "framer-motion";
import { formatDuration, formatHoursLong } from "../utils/time";
import { getLevelInfo } from "../utils/leveling";

export default function TopicCard({ stats, onClick }) {
  const levelInfo = getLevelInfo(stats.totalMs);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="text-left w-full rounded-[24px] border border-gray-100 bg-gray-50 p-6 hover:shadow-xl hover:border-gray-200 transition-all zen-panel group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-emerald-500 transition-colors">
            Topic
          </p>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-black">{stats.topic}</h3>
        </div>
        <div className="rounded-2xl bg-black text-white px-3 py-2 text-center min-w-[64px]">
          <div className="text-[10px] uppercase tracking-widest opacity-70">Lvl</div>
          <div className="text-xl font-black leading-none">{levelInfo.level}</div>
        </div>
      </div>

      <p className="mt-4 text-3xl font-black tracking-tight text-black">{formatHoursLong(stats.totalMs)}</p>

      <div className="mt-4 h-1.5 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all"
          style={{ width: `${levelInfo.progress * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {levelInfo.xpRemaining} XP to Level {levelInfo.level + 1}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Stat label="Last Studied" value={stats.lastStudied || "—"} small />
        <Stat label="Sessions" value={stats.sessionCount} />
        <Stat label="This Week" value={formatDuration(stats.weeklyMs)} />
        <Stat label="This Month" value={formatDuration(stats.monthlyMs)} />
        <Stat label="Longest" value={formatDuration(stats.longestSession)} className="col-span-2" />
      </div>
    </motion.button>
  );
}

function Stat({ label, value, small, className = "" }) {
  return (
    <div className={className}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className={`mt-0.5 font-bold text-gray-800 ${small ? "text-xs" : ""}`}>{value}</p>
    </div>
  );
}
