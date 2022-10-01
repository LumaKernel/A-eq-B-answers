export const calc = (input: string): string => {
  return input.split("").reverse().join("").replace(/a/, "").replace(/a/, "")
    .replace(/a/, "").split("").reverse().join("");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length >= 3;
};
export const challenge = 5;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
