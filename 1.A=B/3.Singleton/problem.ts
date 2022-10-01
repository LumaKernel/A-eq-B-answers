export const calc = (input: string): string => {
  return input.replace(/([abc])\1+/g, "$1");
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 3;
export const allowReturn = false;
export const allowStartEnd = false;
export const allowOnce = false;
