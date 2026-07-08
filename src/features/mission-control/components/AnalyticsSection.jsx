import React from "react";
import {
  getAverageSessionLength,
  getDailyHours,
  getMonthlyHours,
  getMostProductiveDay,
  getMostProductiveHour,
  getStudyStreaks,
  getTopicDistribution,
  getWeeklyHours,
  getYearlyHours,
} from "../utils/analytics";
import { formatDuration } from "../utils/time";
import SimpleBarChart from "./SimpleBarChart";
import SimpleDonutChart from "./SimpleDonutChart";

export default function AnalyticsSection({ sessions }) {
  const streaks = getStudyStreaks(sessions);
  const avgSession = getAverageSessionLength(sessions);
  const productiveDay = getMostProductiveDay(sessions);
  const productiveHour = getMostProductiveHour(sessions);

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Analytics</p>
        <h2
          className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          Study Insights
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <InsightCard label="Current Streak" value={`${streaks.current} days`} />
        <InsightCard label="Longest Streak" value={`${streaks.longest} days`} />
        <InsightCard label="Avg Session" value={formatDuration(avgSession)} />
        <InsightCard label="Total Sessions" value={sessions.length} />
        <InsightCard label="Most Productive Day" value={productiveDay || "—"} />
        <InsightCard label="Most Productive Hour" value={productiveHour || "—"} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ChartPanel title="Daily Hours">
          <SimpleBarChart data={getDailyHours(sessions, 14)} />
        </ChartPanel>
        <ChartPanel title="Weekly Hours">
          <SimpleBarChart data={getWeeklyHours(sessions, 8)} color="#06b6d4" />
        </ChartPanel>
        <ChartPanel title="Monthly Hours">
          <SimpleBarChart data={getMonthlyHours(sessions, 6)} color="#8b5cf6" />
        </ChartPanel>
        <ChartPanel title="Yearly Hours">
          <SimpleBarChart data={getYearlyHours(sessions)} color="#f59e0b" />
        </ChartPanel>
        <ChartPanel title="Topic Distribution" className="md:col-span-2">
          <SimpleDonutChart data={getTopicDistribution(sessions)} />
        </ChartPanel>
      </div>
    </section>
  );
}

function InsightCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 zen-panel">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="mt-2 text-xl font-black text-black">{value}</p>
    </div>
  );
}

function ChartPanel({ title, children, className = "" }) {
  return (
    <div className={`rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm zen-panel ${className}`}>
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">{title}</h3>
      {children}
    </div>
  );
}
