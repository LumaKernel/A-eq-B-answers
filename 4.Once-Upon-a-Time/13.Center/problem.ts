export const calc = (input: string): string => {
  return input[(input.length - 1) / 2];
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length % 2 === 1;
};
export const challenge = 10;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
