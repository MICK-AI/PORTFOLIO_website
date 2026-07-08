import React, { useMemo } from "react";
import { getHeatmapData } from "../utils/analytics";
import { parseDateKey } from "../utils/time";

const LEVEL_COLORS = [
  "bg-gray-100",
  "bg-emerald-100",
  "bg-emerald-300",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-700",
];

export default function StudyHeatmap({ sessions, onDayClick }) {
  const cells = useMemo(() => getHeatmapData(sessions, 52), [sessions]);

  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < cells.length; i += 7) {
      result.push(cells.slice(i, i + 7));
    }
    return result;
  }, [cells]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDay = week.find((c) => c);
      if (!firstDay) {
        labels.push({ wi, label: "" });
        return;
      }
      const month = parseDateKey(firstDay.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ wi, label: parseDateKey(firstDay.date).toLocaleDateString([], { month: "short" }) });
        lastMonth = month;
      } else {
        labels.push({ wi, label: "" });
      }
    });
    return labels;
  }, [weeks]);

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Heatmap</p>
        <h2
          className="leading-[0.92] font-extrabold tracking-[-0.02em] text-black"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          Study Activity
        </h2>
      </div>

      <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm zen-panel overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="flex gap-1 mb-2 pl-8">
            {monthLabels.map(({ wi, label }) => (
              <div key={wi} className="flex-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider min-w-[14px]">
                {label}
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 pr-2 text-[10px] text-gray-400 justify-around py-0.5">
              {["M", "", "W", "", "F", "", ""].map((d, i) => (
                <span key={i} className="h-3 leading-3">
                  {d}
                </span>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1 flex-1">
                {week.map((cell) => (
                  <button
                    key={cell.date}
                    type="button"
                    onClick={() => onDayClick?.(cell.date)}
                    title={`${cell.date}: ${cell.hours.toFixed(1)}h`}
                    className={[
                      "w-full aspect-square rounded-[3px] min-w-[11px] max-w-[14px] heatmap-cell transition-transform hover:scale-125",
                      LEVEL_COLORS[cell.level],
                    ].join(" ")}
                    data-level={cell.level}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <span>Less</span>
          {LEVEL_COLORS.map((c, i) => (
            <span key={i} className={`w-3 h-3 rounded-[2px] ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
