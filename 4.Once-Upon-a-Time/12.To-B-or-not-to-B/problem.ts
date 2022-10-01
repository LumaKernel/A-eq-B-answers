export const calc = (input: string): string => {
  return input.replace(/a/g, /b/.test(input) ? "b" : "c");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 9;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
