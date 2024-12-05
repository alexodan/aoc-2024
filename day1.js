const fs = require("fs");

function solution(input) {
    const left = [], right = [];
    const lines = input.trim().split("\n");
    for (let i = 0; i < lines.length; i++) {
        const [n1, n2] = lines[i].split("   ");
        console.log(n1, n2);
        left.push(n1);
        right.push(n2);
    }
    const leftSorted = left.sort((a, b) => a - b);
    const rightSorted = right.sort((a, b) => a - b);
    return leftSorted.reduce((sum, val, i) => {
        return sum + Math.abs(val - rightSorted[i]);
    }, 0);
}

// part 2
function solutionPart2(input) {
    const left = [], right = [];
    const lines = input.trim().split("\n");
    for (let i = 0; i < lines.length; i++) {
        const [n1, n2] = lines[i].split("   ");
        left.push(n1);
        right.push(n2);
    }
    const leftSorted = left.sort((a, b) => a - b);
    const rightSorted = right.sort((a, b) => a - b);
    let i = 0, j = 0;
    let score = 0;
    let appearances = 0;
    while (i < leftSorted.length && j < rightSorted.length) {
        if (leftSorted[i] === rightSorted[j]) {
            let prevJ = j;
            while (leftSorted[i] === rightSorted[j]) {
                appearances++;
                j++;
            }
            score += leftSorted[i] * appearances;
            appearances = 0;
            j = prevJ;
            i++;
        } else if (leftSorted[i] < rightSorted[j]) {
            i++;
        } else {
            j++;
        }
    }
    return score;
}

const content = fs.readFileSync("./input_day1.txt", "utf8")

const lines = `3   4
4   3
2   5
1   3
3   9
3   3
`;

console.log(solutionPart2(lines)); // 31
console.log(solutionPart2(content));
