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

function getVisitedSpots(input) {
  const matrix = input.split("\n").map((line) => line.split(""));
  let [posX, posY] = getGuard(matrix);
  let guard = matrix[posX][posY];
  let visitedSpots = [];
  while (
    posX >= 0 &&
    posX + 1 < matrix[0].length &&
    posY >= 0 &&
    posY + 1 < matrix.length
  ) {
    visitedSpots.push([posX, posY]);
    let [nextX, nextY] = getNextPos(guard, posX, posY);
    if (matrix[nextX][nextY] === "#") {
      guard =
        guard === "^" ? ">" : guard === ">" ? "v" : guard === "v" ? "<" : "^";
    } else {
      posX = nextX;
      posY = nextY;
    }
  }
  visitedSpots.push([posX, posY]);
  return visitedSpots;
}

function solutionPart2(input) {
  const matrix = input.split("\n").map((line) => line.split(""));
  const visitedSpots = getVisitedSpots(input);
  const [guardX, guardY] = getGuard(matrix);
  let count = 0;
  for (let spot of removeDuplicateTuples(visitedSpots)) {
    let [spotX, spotY] = spot;
    if (spotX === guardX && spotY === guardY) {
      continue;
    }
    matrix[spotX][spotY] = "0";
    if (isLoop(matrix, spot)) {
      count++;
    }
    matrix[spotX][spotY] = ".";
  }
  return count;
}

function isLoop(matrix, spot) {
  let [posX, posY] = getGuard(matrix);
  let guard = matrix[posX][posY];
  //   let set = new Set();
  let visited = 0;
  do {
    let [nextX, nextY] = getNextPos(guard, posX, posY);
    if (matrix[nextX][nextY] === "#" || matrix[nextX][nextY] === "0") {
      guard =
        guard === "^" ? ">" : guard === ">" ? "v" : guard === "v" ? "<" : "^";
    } else {
      //   if (set.has(`${nextX},${nextY}`)) {
      //     console.log(spot);
      //     return true;
      //   }
      if (visited >= matrix.length * matrix[0].length) {
        // console.log(spot);
        return true;
      }
      //   matrix[posX][posY] = "x";
      //   console.log(matrix.join("\n"));
      //   set.add(`${posX},${posY}`);
      visited++;
      [posX, posY] = [nextX, nextY];
    }
  } while (
    posX > 0 &&
    posX + 1 < matrix[0].length &&
    posY > 0 &&
    posY + 1 < matrix.length
  );
  return false;
}

console.log(solutionPart2(input));
console.log(solutionPart2(content));

function removeDuplicateTuples(arr) {
  // Convert tuples to strings for comparison
  const seen = new Set();

  return arr.filter((tuple) => {
    const tupleStr = JSON.stringify(tuple);
    if (seen.has(tupleStr)) {
      return false;
    }
    seen.add(tupleStr);
    return true;
  });
}
