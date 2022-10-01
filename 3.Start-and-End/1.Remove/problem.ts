export const calc = (input: string): string => {
  return input.replace(/^a+|a+$/g, "");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 2;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = false;
