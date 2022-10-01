export const calc = (input: string): string => {
  return input.replace(/^(a+)(.*?)(b+)$/, "$3$2$1");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return input.length >= 2 && input.startsWith("a") && input.endsWith("b");
};
export const challenge = 4;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = false;
