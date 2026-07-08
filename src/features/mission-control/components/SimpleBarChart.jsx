export default function SimpleBarChart({ data = [], color = "#10b981", height = 160 }) {
  const max = Math.max(...data.map((d) => d.hours), 0.1);

  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((item, i) => {
        const pct = (item.hours / max) * 100;
        return (
          <div key={`${item.label}-${i}`} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <div className="w-full flex items-end justify-center" style={{ height: height - 24 }}>
              <div
                className="w-full max-w-[28px] rounded-t-md transition-all duration-500"
                style={{
                  height: `${Math.max(pct, item.hours > 0 ? 4 : 0)}%`,
                  backgroundColor: color,
                  opacity: item.hours > 0 ? 1 : 0.15,
                }}
                title={`${item.label}: ${item.hours.toFixed(1)}h`}
              />
            </div>
            <span className="text-[9px] text-gray-400 truncate w-full text-center">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
