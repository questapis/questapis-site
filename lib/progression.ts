export const levelThresholds = [0, 100, 260, 480, 760, 1100, 1510, 1990, 2540, 3160];

export function levelFromXp(xp: number) {
  if (!Number.isInteger(xp) || xp < 0) throw new Error("XP must be a non-negative integer");
  let level = 1;
  for (let index = 1; index < levelThresholds.length; index += 1) {
    if (xp >= levelThresholds[index]) level = index + 1;
  }
  return level;
}

export function levelProgress(xp: number) {
  const level = levelFromXp(xp);
  const floor = levelThresholds[level - 1];
  const ceiling = levelThresholds[level] ?? floor;
  return {
    level,
    current: xp - floor,
    required: Math.max(0, ceiling - floor),
    percent: ceiling === floor ? 100 : Math.round(((xp - floor) / (ceiling - floor)) * 100),
  };
}

