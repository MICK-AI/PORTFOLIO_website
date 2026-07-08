import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_TOPICS } from "../constants/topics";
import { formatDuration } from "../utils/time";

export default function SessionSaveModal({ isOpen, durationMs, onSave, onDiscard }) {
  const [topic, setTopic] = useState(DEFAULT_TOPICS[0]);
  const [customTopic, setCustomTopic] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTopic(DEFAULT_TOPICS[0]);
      setCustomTopic("");
      setNotes("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resolvedTopic = topic === "Custom" ? customTopic.trim() : topic;

  const handleSave = () => {
    if (!resolvedTopic) return;
    onSave({ topic: resolvedTopic, notes: notes.trim() });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onDiscard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-lg rounded-[24px] border border-gray-200 bg-white p-8 shadow-[0_20px_80px_rgb(0,0,0,0.12)] zen-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-black">Save Session</h3>
            <p className="mt-2 text-gray-500 text-sm">
              Duration: <span className="font-bold text-black">{formatDuration(durationMs)}</span>
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Category
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-black outline-none focus:border-black/20"
                >
                  {DEFAULT_TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {topic === "Custom" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Custom Topic
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Enter topic name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black/20"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="What did you learn?"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none resize-none focus:border-black/20"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-3 justify-end">
              <button
                type="button"
                onClick={onDiscard}
                className="px-6 py-3 rounded-full border-2 border-black/5 text-sm font-bold hover:bg-gray-50"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!resolvedTopic}
                className="px-6 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-40"
              >
                Save Session
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
