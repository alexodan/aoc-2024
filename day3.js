const fs = require("fs");
const content = fs.readFileSync("./input_day3.txt", "utf8")

const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

function solutionPart1(str) {
    let occurrences = str.match(/mul\(\d+,\d+\)/g)
    let nums = [];
    for (let oc of occurrences) {
        const numStr = oc.substring(oc.indexOf("(") + 1, oc.indexOf(")"));
        const [n1, n2] = numStr.split(",").map(Number);
        nums.push(n1 * n2);
    }
    return nums.reduce((a, b) => a + b, 0);
}

function solutionPart2(str) {
    let occurrences = str.match(/mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g)
    let nums = [];
    let enable = true;
    for (let oc of occurrences) {
        if (oc === "don't()") {
            enable = false;
        } else if (oc === "do()") {
            enable = true;
        }
        if (enable && oc !== "do()") {
            const numStr = oc.substring(oc.indexOf("(") + 1, oc.indexOf(")"));
            const [n1, n2] = numStr.split(",").map(Number);
            nums.push(n1 * n2);
        }
    }
    return nums.reduce((a, b) => a + b, 0);
}

console.log(solutionPart2(input)); // 48
console.log(solutionPart2(content)); // ?
