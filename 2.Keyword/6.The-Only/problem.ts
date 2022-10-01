export const calc = (input: string): string => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const prev = input[i - 1];
    const c = input[i];
    const next = input[i + 1];
    if (c !== prev && c !== next) count++;
  }
  return (count === 1).toString();
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return true;
};
export const challenge = 13;
export const allowReturn = true;
export const allowStartEnd = false;
export const allowOnce = false;
