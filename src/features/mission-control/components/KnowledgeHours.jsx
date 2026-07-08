import React, { useMemo, useState } from "react";
import { getTopicStats } from "../utils/analytics";
import TopicCard from "./TopicCard";
import TopicDetailModal from "./TopicDetailModal";

export default function KnowledgeHours({ sessions }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = useMemo(() => {
    const fromSessions = [...new Set(sessions.map((s) => s.topic))];
    return fromSessions
      .map((topic) => getTopicStats(sessions, topic))
      .sort((a, b) => b.totalMs - a.totalMs);
  }, [sessions]);

  const activeStats = selectedTopic ? getTopicStats(sessions, selectedTopic) : null;

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Knowledge Hours</p>
        <h2
          className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          Lifetime Learning
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Every saved session accumulates toward your lifetime knowledge hours — like a Steam library for skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((stats) => (
          <TopicCard key={stats.topic} stats={stats} onClick={() => setSelectedTopic(stats.topic)} />
        ))}
      </div>

      {topics.length === 0 && (
        <div className="rounded-[24px] border border-dashed border-gray-200 p-12 text-center text-gray-400">
          Start a session to begin tracking your knowledge hours.
        </div>
      )}

      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          stats={activeStats}
          sessions={sessions}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </section>
  );
}
