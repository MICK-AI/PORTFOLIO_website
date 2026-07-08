import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatDuration } from "../utils/time";
import SessionSaveModal from "./SessionSaveModal";

const MODE_LABELS = {
  pomodoro: "Pomodoro",
  stopwatch: "Stopwatch",
  countdown: "Countdown",
};

export default function TimerPanel({ timer, onSessionComplete }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [pendingDuration, setPendingDuration] = useState(0);
  const [pendingStart, setPendingStart] = useState(null);

  const handleStop = () => {
    const result = timer.stop();
    if (result.durationMs > 0) {
      setPendingDuration(result.durationMs);
      setPendingStart(result.startTime);
      setShowSaveModal(true);
    }
  };

  const handleSave = ({ topic, notes }) => {
    const endTime = new Date();
    onSessionComplete({
      topic,
      notes,
      durationMs: pendingDuration,
      startTime: pendingStart || new Date(endTime.getTime() - pendingDuration),
      endTime,
    });
    setShowSaveModal(false);
    setPendingDuration(0);
    setPendingStart(null);
    timer.reset();
  };

  const handleDiscard = () => {
    setShowSaveModal(false);
    setPendingDuration(0);
    setPendingStart(null);
    timer.reset();
  };

  return (
    <div className="rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm zen-panel">
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(MODE_LABELS).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => timer.setMode(key)}
            className={[
              "px-4 py-2 rounded-full text-sm font-bold transition-all",
              timer.mode === key
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {timer.mode === "countdown" && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Set Minutes</label>
          <input
            type="number"
            min={1}
            max={180}
            defaultValue={25}
            onChange={(e) => timer.setCountdownMs(Number(e.target.value) * 60000)}
            className="w-24 rounded-xl border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      )}

      <motion.div
        key={timer.displayMs}
        className="text-center py-10"
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="font-mono text-6xl md:text-7xl font-black tracking-tight text-black tabular-nums">
          {formatDuration(timer.displayMs)}
        </div>
        <p className="mt-3 text-sm text-gray-400 uppercase tracking-widest font-bold">
          {timer.isRunning ? "In Session" : "Ready"}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3">
        {!timer.isRunning ? (
          <button
            type="button"
            onClick={timer.start}
            className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-gray-800 hover:scale-[1.02] transition-all"
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            onClick={timer.pause}
            className="px-8 py-4 rounded-full border-2 border-black/10 font-bold hover:bg-gray-50"
          >
            Pause
          </button>
        )}
        <button
          type="button"
          onClick={handleStop}
          className="px-8 py-4 rounded-full border-2 border-black/10 font-bold hover:bg-gray-50"
        >
          Stop
        </button>
        <button
          type="button"
          onClick={timer.reset}
          className="px-6 py-4 rounded-full text-gray-500 font-bold hover:text-black"
        >
          Reset
        </button>
      </div>

      <SessionSaveModal
        isOpen={showSaveModal}
        durationMs={pendingDuration}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
}
