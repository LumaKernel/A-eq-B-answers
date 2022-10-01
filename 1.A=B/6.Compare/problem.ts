export const calc = (input: string): string => {
  const aCount = [...input].filter((c) => c === "a").length;
  const bCount = [...input].filter((c) => c === "b").length;
  return (aCount > bCount) ? "a" : "b";
};

export const inputType = "ab";
export const isValidInput = (input: string): boolean => {
  const aCount = [...input].filter((c) => c === "a").length;
  const bCount = [...input].filter((c) => c === "b").length;
  return aCount !== bCount;
};
export const challenge = 4;
export const allowReturn = false;
export const allowStartEnd = false;
export const allowOnce = false;
