export const calc = (input: string): string => {
  return input.replace(/^a+/, (s) => s.replace(/./g, "b"))
    .replace(/a+$/, (s) => s.replace(/./g, "b"));
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 4;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = false;
