export const calc = (input: string): string => {
  const aCount = [...input].filter((c) => c === "a").length;
  const bCount = [...input].filter((c) => c === "b").length;
  const cCount = [...input].filter((c) => c === "c").length;
  return (aCount < bCount && bCount < cCount).toString();
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 8;
export const allowReturn = true;
export const allowStartEnd = false;
export const allowOnce = false;
