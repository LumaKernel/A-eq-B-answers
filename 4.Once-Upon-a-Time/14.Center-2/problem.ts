export const calc = (input: string): string => {
  return input.slice(0, (input.length - 1) / 2) +
    input.slice((input.length + 1) / 2);
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length % 2 === 1;
};
export const challenge = 15;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
