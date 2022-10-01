export const calc = (input: string): string => {
  return input.replace(/^([bc]*)a(.*)$/g, "a$2$1");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return /a/.test(input);
};
export const challenge = 2;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = false;
