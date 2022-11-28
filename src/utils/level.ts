export const getLevelByXp = (xp: number) => Math.floor(0.7 * Math.cbrt(xp));
export const getXpByLevel = (level: number) => (level / 0.7) ** 3;
