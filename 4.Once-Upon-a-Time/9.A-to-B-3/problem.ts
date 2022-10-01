export const calc = (input: string): string => {
  return input.replace(/[ab]/g, (c) => c === "a" ? "b" : "a");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 5;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
