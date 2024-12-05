const fs = require("fs");
const content = fs.readFileSync("./input_day2.txt", "utf8")

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function solutionPart1(lines) {
    let safe = 0;
    for (let i = 0; i < lines.length; i++) {
        let nums = lines[i].split(" ").map(Number);
        // The levels are either all increasing or all decreasing.
        // Any two adjacent levels differ by at least one and at most three.
        if (nums[0] === nums[nums.length - 1]) {
            continue;
        }
        let type = nums[0] > nums[nums.length - 1] ? "desc" : "asc"; // desc
        if (isSafe(type, nums)) {
            safe++;
        }
    }
    return safe;
}

function isSafe(type, nums) {
    for (let j = 0; j < nums.length - 1; j++) {
        if (type === "desc" && nums[j] <= nums[j+1]) {
            return false;
        } else if (type === "asc" && nums[j] >= nums[j+1]) {
            return false;
        }
        if (Math.abs(nums[j] - nums[j+1]) > 3) {
            return false;
        }
    }
    return true;
}

function solutionPart2(lines) {
    let safe = 0;
    let arr = [];
    for (let i = 0; i < lines.length; i++) {
        let nums = lines[i].split(" ").map(Number);
        // The levels are either all increasing or all decreasing.
        // Any two adjacent levels differ by at least one and at most three.
        if (nums[0] === nums[nums.length - 1]) {
            continue;
        }
        let type = getGeneralDirection(nums);
        if (isSafe2(type, nums)) {
            safe++;
            arr.push(lines[i]);
        }
    }
    return arr;
}

console.log("isSafe:", isSafe2("desc", [9,7,12,5,2,1]))

function isSafe2(type, nums) {
    let index = -1;
    let j = 0;
    // 9 7 12 5 2 => 9 7 5 2
    while (j < nums.length - 1) {
        if (type === "desc" && nums[j] <= nums[j+1]) {
            if (index !== -1) {
                return false;
            }
            nums.splice(j + 1, 1);
            index = j;
            continue;
        } else if (type === "asc" && nums[j] >= nums[j+1]) {
            if (index !== -1) {
                return false;
            }
            nums.splice(j + 1, 1);
            index = j;
            continue;
        }
        if (Math.abs(nums[j] - nums[j+1]) > 3) {
            if (index !== -1) {
                return false;
            }
            nums.splice(j + 1, 1);
            index = j;
            continue;
        }
        j++;
    }
    return true;
}

function getGeneralDirection(nums) {
    let ascCount = 0;
    let descCount = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < nums[i + 1]) {
            ascCount++;
        } else if (nums[i] > nums[i + 1]) {
            descCount++;
        }
    }
    
    return ascCount >= descCount ? "asc" : "desc";
}

// Claude

function solutionPart2Claude(lines) {
    let safe = 0;
    let arr = [];
    for (const line of lines) {
        if (line.trim() === '') continue;
        const nums = line.split(" ").map(Number);
        if (isSequenceSafe(nums) || canBeMadeSafe(nums)) {
            safe++;
            arr.push(line);
        }
    }
    return arr;
}

function isSequenceSafe(nums) {
    // Check if sequence is already safe (without removing any numbers)
    let increasing = true;
    let decreasing = true;
    
    for (let i = 0; i < nums.length - 1; i++) {
        const diff = nums[i + 1] - nums[i];
        if (diff <= 0) increasing = false;
        if (diff >= 0) decreasing = false;
        if (Math.abs(diff) > 3) return false;
        if (!increasing && !decreasing) return false;
    }
    
    return true;
}

function canBeMadeSafe(nums) {
    // Try removing each number and check if resulting sequence is safe
    for (let i = 0; i < nums.length; i++) {
        const newNums = [...nums.slice(0, i), ...nums.slice(i + 1)];
        if (isSequenceSafe(newNums)) {
            return true;
        }
    }
    return false;
}

let safes = solutionPart2Claude(content.split("\n"));
let wrongSafes = solutionPart2(content.split("\n"));
let diff = [];
for (let safe of safes) {
    if (!wrongSafes.includes(safe)) {
        diff.push(safe);
    }
}
console.log(diff);