export const calc = (input: string): string => {
  return input.slice(0, 2) + input.slice(3);
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length >= 3;
};
export const challenge = 7;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
