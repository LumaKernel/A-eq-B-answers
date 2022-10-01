export const calc = (input: string): string => {
  return input.at(-1) + input.slice(1, -1) + input[0];
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length >= 2;
};
export const challenge = 7;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
