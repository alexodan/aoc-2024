const fs = require("fs");
const content = fs.readFileSync("./day6.txt", "utf8");

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

function getGuard(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const c = matrix[i][j];
      if (["^", "v", ">", "<"].includes(c)) {
        return [i, j];
      }
    }
  }
  throw new Error("guard is not in the map");
}

function getNextPos(guardDir, x, y) {
  switch (guardDir) {
    case "^":
      return [x - 1, y];
    case "v":
      return [x + 1, y];
    case ">":
      return [x, y + 1];
    case "<":
      return [x, y - 1];
    default:
      throw new Error("guardDir not possible");
  }
}

function solutionPart1(input) {
  const matrix = input.split("\n").map((line) => line.split(""));
  let [posX, posY] = getGuard(matrix);
  let guard = matrix[posX][posY];
  while (
    posX >= 0 &&
    posX + 1 < matrix[0].length &&
    posY >= 0 &&
    posY + 1 < matrix.length
  ) {
    matrix[posX][posY] = "X";
    let [nextX, nextY] = getNextPos(guard, posX, posY);
    if (matrix[nextX][nextY] === "#") {
      guard =
        guard === "^" ? ">" : guard === ">" ? "v" : guard === "v" ? "<" : "^";
    } else {
      posX = nextX;
      posY = nextY;
    }
  }
  matrix[posX][posY] = "X";
  return matrix.reduce(
    (sum, lines) => sum + lines.filter((c) => c === "X").length,
    0
  );
}

// console.log(solutionPart1(input));
// console.log(solutionPart1(content));
