export const calc = (input: string): string => {
  return input.replace(/.(.)?/g, "$1");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 8;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
