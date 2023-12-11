export const shuffle = <T>(array: T[] | readonly T[]) => [...array].sort(() => (Math.random() >= 0.5 ? 1 : -1));
