import React, { useMemo, useState } from "react";
import { getCalendarMonthDays } from "../utils/analytics";
import { parseDateKey, toDateKey } from "../utils/time";

export default function StudyCalendar({ sessions, reflections, onDayClick }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => getCalendarMonthDays(year, month), [year, month]);

  const hoursByDay = useMemo(() => {
    const map = {};
    for (const s of sessions) {
      map[s.date] = (map[s.date] || 0) + s.durationMs;
    }
    return map;
  }, [sessions]);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Calendar</p>
        <h2
          className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          Study Calendar
        </h2>
      </div>

      <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm zen-panel">
        <div className="flex items-center justify-between mb-6">
          <button type="button" onClick={prevMonth} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-bold hover:bg-gray-50">
            ←
          </button>
          <h3 className="text-xl font-extrabold">
            {viewDate.toLocaleDateString([], { month: "long", year: "numeric" })}
          </h3>
          <button type="button" onClick={nextMonth} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-bold hover:bg-gray-50">
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((dateKey, i) => {
            if (!dateKey) return <div key={`empty-${i}`} />;
            const hours = (hoursByDay[dateKey] || 0) / 3600000;
            const isToday = dateKey === toDateKey(today);
            const hasReflection = reflections[dateKey];

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => onDayClick?.(dateKey)}
                className={[
                  "aspect-square rounded-xl border p-1 flex flex-col items-center justify-center transition-all hover:scale-105",
                  isToday ? "border-black bg-black text-white" : "border-gray-100 bg-gray-50 hover:border-gray-200",
                  hours > 0 && !isToday ? "ring-2 ring-emerald-400/30" : "",
                ].join(" ")}
              >
                <span className="text-sm font-bold">{parseDateKey(dateKey).getDate()}</span>
                {hours > 0 && (
                  <span className={`text-[9px] font-bold mt-0.5 ${isToday ? "text-emerald-300" : "text-emerald-600"}`}>
                    {hours.toFixed(1)}h
                  </span>
                )}
                {hasReflection && (
                  <span className={`w-1 h-1 rounded-full mt-0.5 ${isToday ? "bg-cyan-300" : "bg-cyan-400"}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
