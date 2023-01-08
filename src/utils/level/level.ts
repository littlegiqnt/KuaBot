export const getLevelByXp = (xp: number) => Math.ceil(0.7 * Math.sqrt(xp));
export const getXpByLevel = (level: number) => (level / 0.7) ** 2;
