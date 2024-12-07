const fs = require("fs");
const content = fs.readFileSync("./day7.txt", "utf8");

const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

function solutionPart1(input) {
  const opsMap = {
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
  };
  const ops = Object.keys(opsMap);
  const lines = input.split("\n");
  let sum = 0;
  for (let line of lines) {
    const [testStr, numbersStr] = line.split(": ");
    const [test, numbers] = [
      Number(testStr),
      numbersStr.split(" ").map(Number),
    ];
    const allOps = generateCombinations(ops, numbers.length - 1);
    for (let possibleGoodOp of allOps) {
      let result = possibleGoodOp.reduce((prev, op, i) => {
        return opsMap[op](prev, numbers[i + 1]);
      }, numbers[0]);
      if (result === test) {
        sum += result;
        break;
      }
    }
  }
  return sum;
}

function generateCombinations(arr, length) {
  const result = [];
  function generateHelper(current) {
    // Base case: if current combination has reached desired length
    if (current.length === length) {
      result.push([...current]);
      return;
    }
    // For each number in input array, add it to current combination
    for (let num of arr) {
      current.push(num);
      generateHelper(current);
      current.pop();
    }
  }
  generateHelper([]);
  return result;
}

function solutionPart2(input) {
  const opsMap = {
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
    "||": (a, b) => Number(`${a}${b}`),
  };
  const ops = Object.keys(opsMap);
  const lines = input.split("\n");
  let sum = 0;
  for (let line of lines) {
    const [testStr, numbersStr] = line.split(": ");
    const [test, numbers] = [
      Number(testStr),
      numbersStr.split(" ").map(Number),
    ];
    const allOps = generateCombinations(ops, numbers.length - 1);
    for (let possibleGoodOp of allOps) {
      let result = possibleGoodOp.reduce((prev, op, i) => {
        return opsMap[op](prev, numbers[i + 1]);
      }, numbers[0]);
      if (result === test) {
        sum += result;
        break;
      }
    }
  }
  return sum;
}

console.log(solutionPart1(input));
console.log(solutionPart1(content));

console.log(solutionPart2(input));
console.log(solutionPart2(content));
