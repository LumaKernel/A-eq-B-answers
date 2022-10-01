import { noMostTies } from "../../common.ts";

export const calc = (input: string): string => {
  const aCount = [...input].filter((c) => c === "a").length;
  const bCount = [...input].filter((c) => c === "b").length;
  const cCount = [...input].filter((c) => c === "c").length;
  return ([[aCount, "a"], [bCount, "b"], [cCount, "c"]] as [number, string][])
    .sort((x, y) => y[0] - x[0])[0][1];
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return noMostTies(input);
};
export const challenge = 11;
export const allowReturn = true;
export const allowStartEnd = false;
export const allowOnce = false;
