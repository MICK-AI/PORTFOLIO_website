import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import { useTimer } from "../features/mission-control/hooks/useTimer";
import { useStudySessions } from "../features/mission-control/hooks/useStudySessions";
import { toDateKey } from "../features/mission-control/utils/time";
import TimerPanel from "../features/mission-control/components/TimerPanel";
import ZenToggle from "../features/mission-control/components/ZenToggle";
import KnowledgeHours from "../features/mission-control/components/KnowledgeHours";
import AnalyticsSection from "../features/mission-control/components/AnalyticsSection";
import StudyHeatmap from "../features/mission-control/components/StudyHeatmap";
import StudyCalendar from "../features/mission-control/components/StudyCalendar";
import DayDetailModal from "../features/mission-control/components/DayDetailModal";

const MissionControl = () => {
  const ref = useRef(null);
  const timer = useTimer();
  const { sessions, reflections, saveSession, saveReflection } = useStudySessions();
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("mc-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleSessionComplete = ({ topic, notes, durationMs, startTime, endTime }) => {
    saveSession({
      date: toDateKey(endTime),
      startTime: startTime?.toISOString?.() || new Date().toISOString(),
      endTime: endTime.toISOString(),
      durationMs,
      topic,
      notes,
    });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden font-sans bg-white mc-animate zen-essential"
    >
      <style>{`
        .mc-animate { opacity: 0; transform: translateY(26px);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.8,.2,1); }
        .mc-visible { opacity: 1; transform: translateY(0); }
        .mc-stagger-1 { transition-delay: 80ms; }
        .mc-stagger-2 { transition-delay: 160ms; }
        .mc-stagger-3 { transition-delay: 260ms; }
      `}</style>

      <TopBar />

      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-24 lg:py-28 zen-essential">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mc-stagger-1">
              Mission Control
            </p>
            <motion.h1
              className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black mc-stagger-2"
              style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Zen
            </motion.h1>
            <p className="mt-4 text-gray-600 max-w-2xl mc-stagger-3">
              Track lifetime knowledge hours. Enter Zen Mode to transform the entire site into a quiet, immersive study space.
            </p>
          </div>
          <ZenToggle />
        </div>

        <div className="relative h-px w-full bg-black/10 my-16" />

        <div className="mb-24">
          <TimerPanel timer={timer} onSessionComplete={handleSessionComplete} />
        </div>

        <div className="mb-24">
          <KnowledgeHours sessions={sessions} />
        </div>

        <div className="mb-24">
          <AnalyticsSection sessions={sessions} />
        </div>

        <div className="mb-24">
          <StudyHeatmap sessions={sessions} onDayClick={setSelectedDay} />
        </div>

        <div className="mb-12">
          <StudyCalendar
            sessions={sessions}
            reflections={reflections}
            onDayClick={setSelectedDay}
          />
        </div>
      </div>

      <DayDetailModal
        dateKey={selectedDay}
        sessions={sessions}
        reflection={selectedDay ? reflections[selectedDay] : ""}
        onSaveReflection={saveReflection}
        onClose={() => setSelectedDay(null)}
      />
    </section>
  );
};

export default MissionControl;
