export const calc = (input: string): string => {
  const [a, b] = input.split("-");
  return (Number.parseInt(a, 2) - Number.parseInt(b, 2)).toString(2);
};

export const inputType = "n-m";
export const isValidInput = (input: string): boolean => {
  const [a, b] = input.split("-");
  return (Number.parseInt(a, 2) - Number.parseInt(b, 2)) >= 0;
};
export const challenge = 8;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
