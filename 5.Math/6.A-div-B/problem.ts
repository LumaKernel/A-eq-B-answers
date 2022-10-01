export const calc = (input: string): string => {
  const [a, b] = input.split("/");
  const an = Number.parseInt(a, 2);
  const bn = Number.parseInt(b, 2);
  return Math.floor(an / bn).toString(2) + "," +
    Math.floor(an % bn).toString(2);
};

export const inputType = "n/m";
export const isValidInput = (input: string): boolean => {
  const [, b] = input.split("/");
  const bn = Number.parseInt(b, 2);
  return bn !== 0;
};
export const challenge = 40;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
