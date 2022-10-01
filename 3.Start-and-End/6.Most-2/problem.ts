import { noMostTies } from "../../common.ts";

export const calc = (input: string): string => {
  return [..."abc"].map((t) => ({
    count: [...input].filter((c) => c === t).length,
    others: [..."abc"].filter((c) => c !== t),
  })).sort((x, y) => y.count - x.count)[0].others.reduce(
    (s, c) => s.replaceAll(c, ""),
    input,
  );
};

export const inputType = "abc";
export const isValidInput = (input: string): boolean => {
  return noMostTies(input);
};
export const challenge = 11;
export const allowReturn = true;
export const allowStartEnd = true;
export const allowOnce = false;
