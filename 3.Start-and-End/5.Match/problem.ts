export const calc = (input: string): string => {
  return input.endsWith(input[0]).toString();
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length >= 2;
};
export const challenge = 7;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = false;
