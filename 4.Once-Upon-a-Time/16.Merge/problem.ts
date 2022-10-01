export const calc = (input: string): string => {
  const [s, t] = input.split(",");
  return s.split("").map((c, i) => c + t[i]).join("");
};

export const inputType = "abc,";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 9;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = true;
