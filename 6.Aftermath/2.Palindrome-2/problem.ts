export const calc = (input: string): string => {
  return (input === ([...input].reverse().join(""))).toString();
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length >= 2;
};
export const challenge = 24;
export const allowReturn = false;
export const allowStartEnd = false;
export const allowOnce = false;
