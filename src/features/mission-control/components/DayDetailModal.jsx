import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDayDetail } from "../utils/analytics";
import { formatDuration, parseDateKey } from "../utils/time";

export default function DayDetailModal({ dateKey, sessions, reflection, onSaveReflection, onClose }) {
  const [notes, setNotes] = useState(reflection || "");

  useEffect(() => {
    setNotes(reflection || "");
    if (dateKey) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [dateKey, reflection]);

  if (!dateKey) return null;

  const detail = getDayDetail(sessions, dateKey);

  const handleSave = () => {
    onSaveReflection(dateKey, notes);
    onClose();
  };

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
          className="relative w-full max-w-lg rounded-[24px] border border-gray-200 bg-white p-8 shadow-[0_20px_80px_rgb(0,0,0,0.12)] zen-panel"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Day Detail</p>
          <h3 className="text-3xl font-extrabold tracking-tight text-black mt-1">
            {parseDateKey(dateKey).toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <MiniStat label="Hours" value={`${detail.hours.toFixed(1)}h`} />
            <MiniStat label="Sessions" value={detail.sessionCount} />
            <MiniStat label="Topics" value={detail.topics.length} />
          </div>

          {detail.topics.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Topics Studied</p>
              <div className="flex flex-wrap gap-2">
                {detail.topics.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {detail.sessions.length > 0 && (
            <div className="mt-6 space-y-2 max-h-40 overflow-y-auto">
              {detail.sessions.map((s) => (
                <div key={s.id} className="flex justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm">
                  <span className="font-medium">{s.topic}</span>
                  <span className="font-bold">{formatDuration(s.durationMs)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Reflection
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="What did you learn today?"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none resize-none focus:border-black/20"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full border-2 border-black/5 text-sm font-bold"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800"
            >
              Save Reflection
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 text-center">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}
