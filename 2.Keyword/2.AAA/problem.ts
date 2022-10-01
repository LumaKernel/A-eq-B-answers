export const calc = (input: string): string => {
  const aCount = [...input].filter((c) => c === "a").length;
  return (aCount >= 3).toString();
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 4;
export const allowReturn = true;
export const allowStartEnd = false;
export const allowOnce = false;
