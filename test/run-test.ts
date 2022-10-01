import * as path from "https://deno.land/std@0.158.0/path/mod.ts";

const rootDir = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)));

type Problem = {
  calc: (input: string) => string;
  inputType: string;
  isValidInput: (input: string) => boolean;
  challenge: number;
  allowReturn: boolean;
  allowStartEnd: boolean;
  allowOnce: boolean;
};

type ProgramOrder = {
  from: {
    keyword: null | "once" | "start" | "end";
    text: string;
  };
  to: {
    keyword: null | "start" | "end" | "return";
    text: string;
  };
};
type Program = ProgramOrder[];

type TestCase = {
  stageName: string;
  caseName: string;
  problem: Problem;
  challengeAnswer: Program | null;
  othersAnswer: Program[];
};

const parsePattern = (pat: string) => {
  const g = pat.match(/^(?:\(([^\(\) #]+)\))?([^\(\) #]*)$/);
  if (g == null) throw new Error(`Invalid pattern "${pat}"`);
  return {
    keyword: (g[1] as string | undefined) ?? null,
    text: g[2],
  };
};
const parseProgram = (content: string): Program => {
  return content
    .split("\n")
    .map((line) => line.replace(/#.*/, ""))
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split("=");
      if (parts.length !== 2) {
        throw new Error("program order should form <text>=<text>");
      }
      const [fromStr, toStr] = parts;
      const from = parsePattern(fromStr);
      const fromKeyword = from.keyword;
      if (
        fromKeyword !== null && fromKeyword !== "once" &&
        fromKeyword !== "start" && fromKeyword !== "end"
      ) {
        throw new Error(`unknown to-keyword "${fromKeyword}"`);
      }
      const to = parsePattern(toStr);
      const toKeyword = to.keyword;
      if (
        toKeyword !== null && toKeyword !== "start" && toKeyword !== "end" &&
        toKeyword !== "return"
      ) {
        throw new Error(`unknown to-keyword "${toKeyword}"`);
      }
      return {
        from: {
          keyword: fromKeyword,
          text: from.text,
        },
        to: {
          keyword: toKeyword,
          text: to.text,
        },
      };
    });
};

const verifyProblemCondition = (problem: Problem, program: Program) => {
  if (!problem.allowReturn) {
    for (const order of program) {
      if (order.to.keyword === "return") throw new Error("return not allowed");
    }
  }
  if (!problem.allowStartEnd) {
    for (const order of program) {
      if (order.from.keyword === "start") throw new Error("start not allowed");
      if (order.from.keyword === "end") throw new Error("end not allowed");
      if (order.to.keyword === "start") throw new Error("start not allowed");
      if (order.to.keyword === "end") throw new Error("end not allowed");
    }
  }
  if (!problem.allowOnce) {
    for (const order of program) {
      if (order.from.keyword === "once") throw new Error("once not allowed");
    }
  }
};

const listCases = async () => {
  const testCases: TestCase[] = [];
  for await (const stage of Deno.readDir(rootDir)) {
    if (stage.isDirectory && /^\d+\./.test(stage.name)) {
      for await (
        const testCase of Deno.readDir(path.join(rootDir, stage.name))
      ) {
        const testCaseDir = path.join(rootDir, stage.name, testCase.name);
        const problem: Problem = await import(
          path.join(testCaseDir, "problem.ts")
        );
        if (typeof problem.challenge !== "number") {
          throw new Error(`no .challenge in problem.ts "${testCaseDir}"`);
        }
        if (typeof problem.allowReturn !== "boolean") {
          throw new Error(`no .allowReturn in problem.ts "${testCaseDir}"`);
        }
        if (typeof problem.allowStartEnd !== "boolean") {
          throw new Error(`no .allowStartEnd in problem.ts "${testCaseDir}"`);
        }
        if (typeof problem.allowOnce !== "boolean") {
          throw new Error(`no .allowOnce in problem.ts "${testCaseDir}"`);
        }

        let challengeAnswer: Program | null = null;
        const othersAnswer: Program[] = [];
        for await (const programEntry of Deno.readDir(testCaseDir)) {
          if (!programEntry.name.endsWith(".txt")) continue;
          const content = new TextDecoder().decode(
            await Deno.readFile(
              path.join(
                rootDir,
                stage.name,
                testCase.name,
                programEntry.name,
              ),
            ),
          );
          const program = parseProgram(content);
          if (programEntry.name === "challenge.txt") {
            challengeAnswer = program;
          } else {
            othersAnswer.push(program);
          }
        }

        if (challengeAnswer != null) {
          verifyProblemCondition(problem, challengeAnswer);
        }
        othersAnswer.forEach((program) =>
          verifyProblemCondition(problem, program)
        );

        testCases.push({
          stageName: stage.name,
          caseName: testCase.name,
          problem,
          challengeAnswer,
          othersAnswer,
        });
      }
    }
  }
  return testCases;
};

const runProgram = (
  input: string,
  program: Program,
  maxIter: number,
  maxLen: number,
): string => {
  let current = input;
  const onceUsed = new Set<number>();
  for (let i = 0; i < maxIter; i++) {
    let matched = false;
    for (let orderIndex = 0; orderIndex < program.length; orderIndex++) {
      const order = program[orderIndex];
      if (order.from.keyword === "once" && onceUsed.has(orderIndex)) continue;
      onceUsed.add(orderIndex);
      const m = (() => {
        switch (order.from.keyword) {
          case "start":
            return {
              isMatch: current.startsWith(order.from.text),
              replace: (str: string) =>
                str + current.slice(order.from.text.length),
            };
          case "end":
            return {
              isMatch: current.endsWith(order.from.text),
              replace: (str: string) =>
                current.slice(0, -order.from.text.length) + str,
            };
          default: {
            const t = current.indexOf(order.from.text);
            return {
              isMatch: t !== -1,
              replace: (str: string) =>
                current.slice(0, t) + str +
                current.slice(t + order.from.text.length),
            };
          }
        }
      })();
      if (!m.isMatch) continue;
      matched = true;
      switch (order.to.keyword) {
        case "start":
          current = order.to.text + m.replace("");
          break;
        case "end":
          current = m.replace("") + order.to.text;
          break;
        case "return":
          return order.to.text;
        default:
          current = m.replace(order.to.text);
          break;
      }
      break;
    }
    if (current.length >= maxLen) {
      throw new Error(`max length limit ${maxLen} exceeded`);
    }
    if (!matched) return current;
  }
  throw new Error(`max iteration limit ${maxIter} exceeded`);
};

const testCases = await listCases();
let errorCount = 0;
for (const c of testCases) {
  const title = `[${c.stageName}/${c.caseName}]`;
  console.log(`${title} Testing`);

  const allPrograms = [
    ...c.challengeAnswer != null ? [c.challengeAnswer] : [],
    ...c.othersAnswer,
  ];

  if (allPrograms.length === 0) {
    console.warn("[WARN] no program");
  } else if (c.challengeAnswer != null) {
    if (c.problem.challenge < c.challengeAnswer.length) {
      throw new Error(
        `${title} challenge.txt does not satisfy the challenge goal`,
      );
    }
  } else {
    console.warn("[WARN] no challenge");
  }

  for (const program of allPrograms) {
    const randStr = (chars: string, len: number) => {
      return Array(len).fill(0).map(() =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    };
    const randLen = (exp: number, max: number) => {
      let len = 0;
      while (len < max && Math.floor(Math.random() * exp) !== 0) len++;
      return len;
    };
    const randNum = (len: number) => {
      if (len === 0) return "0";
      return "1" + randStr("01", len);
    };
    for (let i = 0; i < 1000; i++) {
      const input = (() => {
        switch (c.problem.inputType) {
          case "abc": {
            const len = 1 + randLen(6, 8);
            return randStr("abc", len);
          }
          case "ab": {
            const len = 1 + randLen(6, 8);
            return randStr("ab", len);
          }
          case "abc,": {
            const len = 1 + randLen(6, 8);
            return randStr("abc", len) + "," + randStr("abc", len);
          }
          case "n": {
            const len = randLen(2.1, 4);
            return randNum(len);
          }
          case "n+m": {
            const len = randLen(2.1, 5);
            return randNum(len) + "+" + randNum(len);
          }
          case "n-m": {
            const len = randLen(2.1, 5);
            return randNum(len) + "-" + randNum(len);
          }
          case "n*m": {
            const len = randLen(2.1, 5);
            return randNum(len) + "*" + randNum(len);
          }
          case "n/m": {
            const len = randLen(2.1, 5);
            return randNum(len) + "/" + randNum(len);
          }
          default:
            throw new Error(`unknown input type "${c.problem.inputType}"`);
        }
      })();
      if (input !== "" && c.problem.isValidInput(input)) {
        const want = c.problem.calc(input);
        try {
          const got = runProgram(input, program, 100000, 1000);
          if (got !== want) {
            errorCount += 1;
            console.error(`${title} FAILED`);
            console.error(`    input = ${input}`);
            console.error(`    want  = ${want}`);
            console.error(`    got   = ${got}`);
          }
        } catch (e) {
          errorCount += 1;
          console.error(`${title} FAILED`);
          console.error(`    input = ${input}`);
          console.error(`    want  = ${want}`);
          throw e;
        }
      }
    }
  }
}

if (errorCount > 0) Deno.exit(1);
