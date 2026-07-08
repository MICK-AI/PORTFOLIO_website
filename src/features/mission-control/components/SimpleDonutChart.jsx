const COLORS = ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];

export default function SimpleDonutChart({ data = [], size = 140 }) {
  const total = data.reduce((sum, d) => sum + d.hours, 0);
  if (!total) {
    return <div className="text-sm text-gray-400 text-center py-8">No data yet</div>;
  }

  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox="0 0 100 100" className="shrink-0">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        {data.slice(0, 7).map((item, i) => {
          const pct = item.hours / total;
          const dash = pct * c;
          const el = (
            <circle
              key={item.topic}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={COLORS[i % COLORS.length]}
              strokeWidth="12"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 50 50)"
            />
          );
          offset += dash;
          return el;
        })}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="fill-black text-[10px] font-bold">
          {total.toFixed(0)}h
        </text>
      </svg>
      <div className="space-y-1.5 min-w-0">
        {data.slice(0, 5).map((item, i) => (
          <div key={item.topic} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="truncate text-gray-600">{item.topic}</span>
            <span className="font-bold text-black ml-auto">{item.hours.toFixed(1)}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}
