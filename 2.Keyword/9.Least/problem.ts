import { noLeastTies } from "../../common.ts";

export const calc = (input: string): string => {
  const aCount = [...input].filter((c) => c === "a").length;
  const bCount = [...input].filter((c) => c === "b").length;
  const cCount = [...input].filter((c) => c === "c").length;
  return ([[aCount, "a"], [bCount, "b"], [cCount, "c"]] as [number, string][])
    .sort((x, y) => x[0] - y[0])[0][1];
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return noLeastTies(input);
};
export const challenge = 9;
export const allowReturn = true;
export const allowStartEnd = false;
export const allowOnce = false;
