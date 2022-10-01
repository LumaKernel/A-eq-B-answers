export const noMostTies = (input: string): boolean => {
  const counts = [..."abc"].map((t) => ({
    count: [...input].filter((c) => c === t).length,
    char: t,
  })).sort((x, y) => y.count - x.count);
  return counts[0].count !== counts[1].count;
};

export const noLeastTies = (input: string): boolean => {
  const counts = [..."abc"].map((t) => ({
    count: [...input].filter((c) => c === t).length,
    char: t,
  })).sort((x, y) => x.count - y.count);
  return counts[0].count !== counts[1].count;
};
