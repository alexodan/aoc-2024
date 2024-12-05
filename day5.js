const fs = require("fs");
const content = fs.readFileSync("./day5.txt", "utf8");

const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

/**
 * The first section specifies the page ordering rules, one per line.
 * The first rule, 47|53, means that if an update includes both page number 47 and page number 53,
 * then page number 47 must be printed at some point before page number 53.
 */
function solutionPart1(input) {
  const [rulesStr, updatesStr] = input.split("\n\n");
  const rules = rulesStr.split("\n");
  const updates = updatesStr.split("\n");
  //   console.log(rules[0]);
  //   console.log(updates[0]);
  // I'm thinking that I can create a Map of keys being the first page of the orderingRules
  let rulesMap = new Map();
  for (let rule of rules) {
    let [right, left] = rule.split("|"); // 47|53 , 47|13 , 47|61 , 47|29
    if (!rulesMap.get(left)) {
      rulesMap.set(left, [right]);
    } else {
      rulesMap.set(left, [...rulesMap.get(left), right]);
    }
  }
  let correctUpdates = [];
  for (let update of updates) {
    if (isCorrectUpdate(update, rulesMap)) {
      //   console.log("Correct:", update);
      correctUpdates.push(update.split(","));
    }
  }
  return correctUpdates.reduce(
    (sum, arr) => sum + Number(arr[Math.floor(arr.length / 2)]),
    0
  );
  // The values all pages that should come after it (after the key)
  // 97 => 13, 61, 47, 29, 53, 75
  // 47 => 53, 47, 13, 61, 29
  // So whenever I get the "pages to produce in each update" - 75,47,61,53,29
  // is 75 included in map[""]
  // is 47 included in map[75]? if yes return false
  // is 61 included in map[47] or map[75]?
  // is 53 included in map[47] or map map[61] or map[75]?
  // is 29 included in ...
  // Problem: This can take a while... O(n.logn)?
}

function isCorrectUpdate(updateStr, rulesMap) {
  const nums = updateStr.split(",");
  //   console.log("isCorrectUpdate");
  //   console.log(nums);
  //   console.log(rulesMap);
  let prevPages = [];
  for (let num of nums) {
    for (let prev of prevPages) {
      //   console.log(`Does ${num} exist in map[${prev}]?`);
      if (rulesMap.get(prev)?.includes(num)) {
        return false;
      }
    }
    prevPages.push(num);
  }
  return true;
}

// console.log(solutionPart1(input));
// console.log(solutionPart1(content));

function solutionPart2(input) {
  const [rulesStr, updatesStr] = input.split("\n\n");
  const rules = rulesStr.split("\n");
  const updates = updatesStr.split("\n");
  // 75,97,47,61,53 becomes 97,75,47,61,53.
  // 61,13,29 becomes 61,29,13.
  // 97,13,75,29,47 becomes 97,75,47,29,13.
  let rulesMap = new Map();
  for (let rule of rules) {
    let [right, left] = rule.split("|");
    if (!rulesMap.get(left)) {
      rulesMap.set(left, [right]);
    } else {
      rulesMap.set(left, [...rulesMap.get(left), right]);
    }
  }
  let correctedUpdates = [];
  for (let update of updates) {
    // I'm thinking I can do something like a bubble sort
    // everytime I find a page that goes after, I exchange the numbers
    // e.g. first 75 "<" current (appears in rulesMap[75]) then exchange
    if (!isCorrectUpdate(update, rulesMap)) {
      let correctedUpdate = fixOrder(update, rulesMap);
      //   console.log(rulesMap);
      //   console.log("update:", update);
      //   console.log("correct:", correctedUpdate);
      correctedUpdates.push(correctedUpdate);
    }
  }
  return correctedUpdates.reduce(
    (sum, arr) => sum + Number(arr[Math.floor(arr.length / 2)]),
    0
  );
}

function fixOrder(update, rulesMap) {
  let nums = update.split(",");
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1; j++) {
      if (rulesMap.get(nums[i])?.includes(nums[j])) {
        let aux = nums[j];
        nums[j] = nums[i];
        nums[i] = aux;
      }
    }
  }
  return nums;
}

console.log(solutionPart2(input));
console.log(solutionPart2(content));
