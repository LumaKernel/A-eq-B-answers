export const calc = (input: string): string => {
  return input.split("").flatMap((c, i) => c.repeat(i + 1)).join("");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 13;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
