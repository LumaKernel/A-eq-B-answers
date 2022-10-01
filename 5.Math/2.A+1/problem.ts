export const calc = (input: string): string => {
  return (Number.parseInt(input, 2) + 1).toString(2);
};

export const inputType = "n";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 4;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
