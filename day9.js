const fs = require("fs");
const content = fs.readFileSync("./day9.txt", "utf8");

const input = `2333133121414131402`;

function solutionPart1(input) {
  const nums = input.split("").map(Number);
  const disk = [];

  let blockCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < nums[i]; j++) {
        disk.push(blockCount);
      }
      blockCount++;
    } else {
      for (let j = 0; j < nums[i]; j++) {
        disk.push(".");
      }
    }
  }
  let curr = 0,
    end = disk.length - 1;
  while (curr < end) {
    if (disk[end] === ".") {
      end--;
      continue;
    }
    if (disk[curr] === ".") {
      // 0099.9..
      [disk[curr], disk[end]] = [disk[end], disk[curr]];
      end--;
    }
    curr++;
  }
  return disk
    .slice(0, disk.indexOf("."))
    .map(Number)
    .reduce((a, b, i) => a + b * i, 0);
}

// console.log(solutionPart1(input));
// console.log(solutionPart1(content));

function solutionPart2(input) {
  const nums = input.split("").map(Number);
  let pos = 0;
  const files = [];
  const disk = [];

  // Create initial disk layout and track files in order
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      // File blocks
      const length = nums[i];
      const start = disk.length;
      files.push({
        id: i / 2, // This ensures files are numbered by order of appearance
        start,
        length,
      });

      // Add the blocks to disk
      for (let j = 0; j < length; j++) {
        disk.push(i / 2);
      }
    } else {
      // Free space blocks
      for (let j = 0; j < nums[i]; j++) {
        disk.push(".");
      }
    }
  }

  //   console.log("Initial:", disk.join(""));
  //   console.log(
  //     "Detected files:",
  //     files
  //       .map((f) => `File ${f.id}: start=${f.start}, length=${f.length}`)
  //       .join("\n")
  //   );

  // Process files in descending order of ID
  const sortedFiles = [...files].sort((a, b) => b.id - a.id);

  for (const file of sortedFiles) {
    const freeSpace = findLeftmostFreeSpace(disk, file.length);
    if (freeSpace !== -1 && freeSpace < file.start) {
      moveFile(disk, file.start, file.length, freeSpace);
      //   console.log(`After moving file ${file.id}:`, disk.join(""));
    }
  }

  //   console.log("Final:", disk.join(""));

  // Fixed checksum calculation
  let checksum = 0;
  for (let pos = 0; pos < disk.length; pos++) {
    if (disk[pos] !== ".") {
      // Here's the key change: we need to use the actual value in the disk
      // as the fileId, which we previously set up correctly during initialization
      checksum += pos * disk[pos];
    }
  }
  return checksum;
}

function findLeftmostFreeSpace(disk, requiredLength) {
  let currentLength = 0;
  let startPos = -1;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === ".") {
      if (startPos === -1) startPos = i;
      currentLength++;
      if (currentLength >= requiredLength) return startPos;
    } else {
      currentLength = 0;
      startPos = -1;
    }
  }

  return -1;
}

function moveFile(disk, oldStart, length, newStart) {
  const fileContents = disk.slice(oldStart, oldStart + length);

  // Clear old location
  for (let i = oldStart; i < oldStart + length; i++) {
    disk[i] = ".";
  }

  // Place at new location
  for (let i = 0; i < length; i++) {
    disk[newStart + i] = fileContents[i];
  }
}

// Test with example input
const example = "2333133121414131402";
console.log("Result:", solutionPart2(example));

console.log("Result:", solutionPart2(content));
