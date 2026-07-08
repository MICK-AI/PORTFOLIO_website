import {
  addDays,
  parseDateKey,
  startOfMonth,
  startOfWeek,
  startOfYear,
  toDateKey,
} from "./time";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function groupSessionsByTopic(sessions) {
  const map = {};
  for (const session of sessions) {
    const topic = session.topic || "Uncategorized";
    if (!map[topic]) map[topic] = [];
    map[topic].push(session);
  }
  return map;
}

export function getTopicStats(sessions, topic) {
  const filtered = sessions.filter((s) => s.topic === topic);
  const totalMs = filtered.reduce((sum, s) => sum + (s.durationMs || 0), 0);
  const now = new Date();
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);

  const weeklyMs = filtered
    .filter((s) => new Date(s.date) >= weekStart)
    .reduce((sum, s) => sum + s.durationMs, 0);

  const monthlyMs = filtered
    .filter((s) => new Date(s.date) >= monthStart)
    .reduce((sum, s) => sum + s.durationMs, 0);

  const lastStudied = filtered.length
    ? filtered.reduce((latest, s) => (s.date > latest ? s.date : latest), filtered[0].date)
    : null;

  const longestSession = filtered.reduce((max, s) => Math.max(max, s.durationMs || 0), 0);

  return {
    topic,
    totalMs,
    sessionCount: filtered.length,
    weeklyMs,
    monthlyMs,
    lastStudied,
    longestSession,
  };
}

export function getDailyHours(sessions, days = 14) {
  const result = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = addDays(today, -i);
    const key = toDateKey(d);
    const ms = sessions
      .filter((s) => s.date === key)
      .reduce((sum, s) => sum + s.durationMs, 0);
    result.push({ label: d.toLocaleDateString([], { month: "short", day: "numeric" }), key, hours: ms / 3600000 });
  }
  return result;
}

export function getWeeklyHours(sessions, weeks = 8) {
  const result = [];
  const now = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = addDays(startOfWeek(now), -i * 7);
    const weekEnd = addDays(weekStart, 6);
    const ms = sessions
      .filter((s) => {
        const d = parseDateKey(s.date);
        return d >= weekStart && d <= weekEnd;
      })
      .reduce((sum, s) => sum + s.durationMs, 0);
    result.push({
      label: weekStart.toLocaleDateString([], { month: "short", day: "numeric" }),
      hours: ms / 3600000,
    });
  }
  return result;
}

export function getMonthlyHours(sessions, months = 6) {
  const result = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const ms = sessions
      .filter((s) => s.date.startsWith(key))
      .reduce((sum, s) => sum + s.durationMs, 0);
    result.push({
      label: d.toLocaleDateString([], { month: "short", year: "2-digit" }),
      hours: ms / 3600000,
    });
  }
  return result;
}

export function getYearlyHours(sessions) {
  const map = {};
  for (const s of sessions) {
    const year = s.date.slice(0, 4);
    map[year] = (map[year] || 0) + s.durationMs;
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, ms]) => ({ label, hours: ms / 3600000 }));
}

export function getTopicDistribution(sessions) {
  const grouped = groupSessionsByTopic(sessions);
  return Object.entries(grouped)
    .map(([topic, list]) => ({
      topic,
      hours: list.reduce((sum, s) => sum + s.durationMs, 0) / 3600000,
    }))
    .sort((a, b) => b.hours - a.hours);
}

export function getStudyStreaks(sessions) {
  const daySet = new Set(sessions.map((s) => s.date));
  const sortedDays = [...daySet].sort();
  if (!sortedDays.length) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    const prev = parseDateKey(sortedDays[i - 1]);
    const curr = parseDateKey(sortedDays[i]);
    const diff = (curr - prev) / 86400000;
    if (diff === 1) {
      run += 1;
      longest = Math.max(longest, run);
    } else if (diff > 1) {
      run = 1;
    }
  }

  let current = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (daySet.has(toDateKey(cursor))) {
    current += 1;
    cursor = addDays(cursor, -1);
  }

  return { current, longest };
}

export function getAverageSessionLength(sessions) {
  if (!sessions.length) return 0;
  const total = sessions.reduce((sum, s) => sum + s.durationMs, 0);
  return total / sessions.length;
}

export function getMostProductiveDay(sessions) {
  const map = {};
  for (const s of sessions) {
    const day = parseDateKey(s.date).getDay();
    map[day] = (map[day] || 0) + s.durationMs;
  }
  const entries = Object.entries(map);
  if (!entries.length) return null;
  const [dayIndex] = entries.sort((a, b) => b[1] - a[1])[0];
  return DAY_NAMES[Number(dayIndex)];
}

export function getMostProductiveHour(sessions) {
  const map = {};
  for (const s of sessions) {
    if (!s.startTime) continue;
    const hour = new Date(s.startTime).getHours();
    map[hour] = (map[hour] || 0) + s.durationMs;
  }
  const entries = Object.entries(map);
  if (!entries.length) return null;
  const [hour] = entries.sort((a, b) => b[1] - a[1])[0];
  const h = Number(hour);
  const suffix = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:00 ${suffix}`;
}

export function getHeatmapData(sessions, weeks = 52) {
  const map = {};
  for (const s of sessions) {
    map[s.date] = (map[s.date] || 0) + s.durationMs;
  }

  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const start = addDays(end, -(weeks * 7 - 1));
  const alignedStart = startOfWeek(start);

  const cells = [];
  let cursor = new Date(alignedStart);
  while (cursor <= end) {
    const key = toDateKey(cursor);
    const ms = map[key] || 0;
    const hours = ms / 3600000;
    cells.push({ date: key, hours, level: getHeatLevel(hours) });
    cursor = addDays(cursor, 1);
  }
  return cells;
}

function getHeatLevel(hours) {
  if (hours <= 0) return 0;
  if (hours < 0.5) return 1;
  if (hours < 1) return 2;
  if (hours < 2) return 3;
  if (hours < 4) return 4;
  return 5;
}

export function getDayDetail(sessions, dateKey) {
  const daySessions = sessions.filter((s) => s.date === dateKey);
  const topics = [...new Set(daySessions.map((s) => s.topic))];
  const hours = daySessions.reduce((sum, s) => sum + s.durationMs, 0) / 3600000;
  return { dateKey, sessions: daySessions, topics, hours, sessionCount: daySessions.length };
}

export function getCalendarMonthDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = (first.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < startPad; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(toDateKey(new Date(year, month, d)));
  }
  return days;
}
