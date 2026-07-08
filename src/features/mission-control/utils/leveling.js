const XP_PER_HOUR = 10;

export function hoursToXp(hours) {
  return Math.floor(hours * XP_PER_HOUR);
}

export function xpThresholdForLevel(level) {
  if (level <= 1) return 0;
  return Math.floor(50 * Math.pow(level - 1, 1.6));
}

export function getLevelFromXp(xp) {
  let level = 1;
  while (xp >= xpThresholdForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

export function getLevelInfo(totalMs) {
  const hours = totalMs / 3600000;
  const xp = hoursToXp(hours);
  const level = getLevelFromXp(xp);
  const currentThreshold = xpThresholdForLevel(level);
  const nextThreshold = xpThresholdForLevel(level + 1);
  const xpInLevel = xp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const xpRemaining = nextThreshold - xp;

  return {
    level,
    xp,
    hours,
    currentThreshold,
    nextThreshold,
    xpInLevel,
    xpNeeded,
    xpRemaining: Math.max(0, xpRemaining),
    progress: xpNeeded > 0 ? Math.min(1, xpInLevel / xpNeeded) : 1,
  };
}
