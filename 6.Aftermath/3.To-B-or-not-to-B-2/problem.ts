export const calc = (input: string): string => {
  return input.replace(/a/g, /b/.test(input) ? "b" : "c");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 13;
export const allowReturn = false;
export const allowStartEnd = false;
export const allowOnce = false;
