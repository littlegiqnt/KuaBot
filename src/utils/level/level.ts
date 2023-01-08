export const getLevelByXp = (xp: number) => Math.ceil(0.7 * Math.cbrt(xp));
export const getXpByLevel = (level: number) => (level / 0.7) ** 3;
