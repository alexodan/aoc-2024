const fs = require("fs");
const content = fs.readFileSync("./day4.txt", "utf8")

const input = `
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
`

function solutionPart2(str) {
    let count = 0;
    let lines = str.split("\n").filter(s => s.length > 0);
    for (let i = 1; i < lines.length - 1; i++) {
        for (let j = 1; j < lines[i].length - 1; j++) {
            const c = lines[i][j];
            if (c === "A") {
                let topLeft = lines[i - 1][j - 1];
                let topRight = lines[i - 1][j + 1];
                let botLeft = lines[i + 1][j - 1];
                let botRight = lines[i + 1][j + 1];
                if ((topLeft === "S" && botRight === "M") || topLeft === "M" && botRight === "S") {
                    if ((topRight === "S" && botLeft === "M") || topRight === "M" && botLeft === "S") {
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

console.log(solutionPart2(input));
console.log(solutionPart2(content));

function getCols(str) {
    let rows = str.split("\n");
    let cols = [];
    for (let i = 0; i < rows[0].length; i++) {
        let s = "";
        for (let j = 0; j < rows.length; j++) {
            s += rows[j][i];
        }
        cols.push(s);
    }
    return cols;
}

function getDiags(str) {
    const rows = str.split("\n");
    const height = rows.length;
    const width = rows[0].length;
    const diags = [];
    
    // Bottom-left to top-right diagonals
    for (let startCol = 0; startCol < width; startCol++) {
        let diag = "";
        let row = height - 1;
        let col = startCol;
        while (row >= 0 && col < width) {
            diag += rows[row][col];
            row--;
            col++;
        }
        if (diag) diags.push(diag);
    }
    
    for (let startRow = height - 2; startRow >= 0; startRow--) {
        let diag = "";
        let row = startRow;
        let col = 0;
        while (row >= 0 && col < width) {
            diag += rows[row][col];
            row--;
            col++;
        }
        if (diag) diags.push(diag);
    }
    
    // Top-left to bottom-right diagonals
    for (let startCol = 0; startCol < width; startCol++) {
        let diag = "";
        let row = 0;
        let col = startCol;
        while (row < height && col < width) {
            diag += rows[row][col];
            row++;
            col++;
        }
        if (diag) diags.push(diag);
    }
    
    for (let startRow = 1; startRow < height; startRow++) {
        let diag = "";
        let row = startRow;
        let col = 0;
        while (row < height && col < width) {
            diag += rows[row][col];
            row++;
            col++;
        }
        if (diag) diags.push(diag);
    }
    
    return diags;
}

function solution1(str) {
    let rows = str.split("\n");
    let cols = getCols(str);
    let diags = getDiags(str);
    let times = 0;
    for (let index = 0; index < rows.length; index++) {
        let rowTimes = rows[index].match(/XMAS/g);
        let reversedTimes = rows[index].split("").reverse().join("").match(/XMAS/g);
        times += rowTimes ? rowTimes.length : 0;
        times += reversedTimes ? reversedTimes.length : 0;
    }
    for (let index = 0; index < cols.length; index++) {
        let colTimes = cols[index].match(/XMAS/g);
        let reversedTimes = cols[index].split("").reverse().join("").match(/XMAS/g);
        times += colTimes ? colTimes.length : 0;
        times += reversedTimes ? reversedTimes.length : 0;
    }
    for (let index = 0; index < diags.length; index++) {
        let diagTimes = diags[index].match(/XMAS/g);
        let reversedTimes = diags[index].split("").reverse().join("").match(/XMAS/g);
        times += diagTimes ? diagTimes.length : 0;
        times += reversedTimes ? reversedTimes.length : 0;
    }
    return times;
}

// console.log(solution1(input));
// console.log(solution1(content));
