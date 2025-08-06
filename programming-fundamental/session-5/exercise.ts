/**
 * Write a function to get the lowest, highest and average value in the array (with and without sort function).
 * Example : arr = [12, 5, 23, 18, 4, 45, 32] → {lowest : 4, highest: 45, average: 19.8xxx}
 */

// with sort function and Math.sumPrecise()
function getLowHighAvg(arr: number[]) {
  const ascArr = arr.sort();

  // first way
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }

  // second way
  const sumReduce = arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return {
    lowest: ascArr[0],
    highest: ascArr[ascArr.length - 1],
    average: sumReduce / arr.length,
  };
}

console.log(getLowHighAvg([12, 5, 23, 18, 4, 45, 32]));

/**
 * Write a function that takes an array of words and returns a string by concatenating the words in the array, separated by commas and - the last word - by an 'and'.
 * Example : arr =  ["apple", "banana", "cherry", "date"] → “apple,banana,cherry, and date”
 */

function concatenateWords(arr: string[]) {
  const wordsJoinedByComma = arr.slice(0, arr.length - 1);
  return `${wordsJoinedByComma.join(', ')}, and ${arr[arr.length - 1]}`;
}

console.log(concatenateWords(['apple', 'banana', 'cherry', 'date']));

/**
 * Write a function from a given array of numbers and return the second smallest number
 * Example : numbers = [5, 3, 1, 7, 2, 6] → 2
 */

function getSecondSmallestNumber(arr: number[]) {
  if (arr.length === 0) {
    return 'array is empty!';
  }

  if (arr.length === 1) {
    return "array length is 1, there's no second smallest number!";
  }

  let smallest = Infinity;
  let secondSmallest = Infinity;

  for (let num of arr) {
    if (num < smallest) {
      secondSmallest = smallest;
      smallest = num;
    } else if (num < secondSmallest) {
      secondSmallest = num;
    }
  }

  return secondSmallest;
}

console.log(getSecondSmallestNumber([5, 3, 7, 2, 6]));

/**
 * Write a function to calculate each element in the same position from two arrays of integer. Assume both arrays are of the same length.
 * Example : [1, 2, 3] + [3, 2, 1] → [4, 4, 4]
 */

function calcArr(arr1: number[], arr2: number[]) {
  const resultArr: number[] = [];

  for (let i = 0; i < arr1.length; i++) {
    resultArr.push(arr1[i] + arr2[i]);
  }

  return resultArr;
}

console.log(calcArr([1, 2, 3], [3, 2, 1]));

/**
 * Write a function that adds an element to the end of an array. However, the element should only be added if it is not already in the array.
 * Example : arr = [1, 2, 3, 4], newElement = 4   →   [1, 2, 3, 4]
 * Example : arr = [1, 2, 3, 4], newElement = 7   →   [1, 2, 3, 4, 7]
 */

function addNumToArray(arr: number[], newElement: number) {
  // includes
  // return arr.includes(newElement) ? arr : [...arr, newElement];

  // Set object in js
  // return [...new Set([...arr, newElement])]
  // return Array.from(new Set([...arr, newElement]))

  // iteration
  let noNewElement = true;
  arr.forEach((num) => {
    if (num === newElement) {
      noNewElement = false;
    }
  });
  return noNewElement ? [...arr, newElement] : arr;
}

console.log(addNumToArray([1, 2, 3, 4], 4));
console.log(addNumToArray([1, 2, 3, 4], 7));

/**
 * Write a function from a given array of mixed data types and return the sum of all the number
 * Example : mixedArray = ["3", 1, "string", null, false, undefined, 2] → 3
 */

function sumOfAllNum(mixedArray: any[]) {
  let sum: number | null = null;

  for (const item of mixedArray) {
    if (typeof item === 'number') {
      sum = (sum || 0) + item;
    }
  }

  return sum === null ? 'there is no number in the array' : sum;
}

console.log(sumOfAllNum(['3', 1, 'string', null, false, undefined, 2]));

/**
 * Write a function that will combine 2 given array into one array
 * Example : arr1 = [1, 2, 3], arr2 =  [4, 5, 6] → [1, 2, 3, 4, 5, 6]
 */

function combineArray(arr1: number[], arr2: number[]) {
  return [...arr1, ...arr2];
}

console.log(combineArray([1, 2, 3], [4, 5, 6]));

/**
 * Write a function to insert multiple given integer (not an array) to an array and have a maximum size input.
 * The array can only have a maximum size from a given input. (if the maximum size of the given input is 5 than the array can only contain 5 elements).
 * Example :
 * maxSize = 5, given integers is 5, 10, 24, 3, 6, 7, 8
 * The function will return [5, 10, 24, 3, 6]
 *
 * michael's solution
 */

function insertMultiple(maxSize: number, ...integers: number[]) {
  let newArr = [];
  for (let integer of integers) {
    if (maxSize === 0) {
      return newArr;
    }
    newArr.push(integer);
    maxSize--;
  }
  return newArr;
}
console.log(insertMultiple(3, 5, 10, 24, 3, 6, 7, 8));

/**
 * Write a function to find the difference in 2 given array
 * Example : arr1 = [1, 2, 3, 4, 5], arr2 =  [3, 4, 5, 6, 7] → [1, 2, 6, 7]
 * bintang's solution
 */

function diffArr(arr1: number[], arr2: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      result.push(arr1[i]);
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    if (!arr1.includes(arr2[i])) {
      result.push(arr2[i]);
    }
  }
  return result;
}
console.log(diffArr([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));

function diffArrWithMap(arr1: number[], arr2: number[]): number[] {
  const result: number[] = [];
  const arr1Map: Record<number, boolean> = arr1.reduce(
    (acc, curr) => ({ ...acc, [curr]: true }),
    {}
  );
  const arr2Map: Record<number, boolean> = arr2.reduce(
    (acc, curr) => ({ ...acc, [curr]: true }),
    {}
  );

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2Map[arr1[i]]) {
      result.push(arr1[i]);
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    if (!arr1Map[arr2[i]]) {
      result.push(arr2[i]);
    }
  }

  return result;
}

console.log(diffArrWithMap([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));

/**
 * Write a function to find duplicate values in an array
 * Example : arr = [1, 2, 2, 2, 3, 3, 4, 5, 5] → [2, 3, 5]
 * chin's solution
 */

const findDuplicate = (arr: number[]) => {
  const numContain: number[] = [];
  const result: number[] = [];
  for (const num of arr) {
    if (!numContain.includes(num)) {
      numContain.push(num);
    } else if (numContain.includes(num) && !result.includes(num)) {
      result.push(num);
    }
  }
  return result;
};

console.log(findDuplicate([1, 2, 2, 2, 3, 3, 4, 5, 5]));

/**
 * Based on the array below write a function that will return primitive data types only.
 * let arr = [1, [], undefined, {}, "string", {}, []];
 * The function will return [1, undefined, “string”]
 */

function isPrimitive(arr: any[]) {
  return arr.filter((element) => typeof element !== 'object');
}

console.log(isPrimitive([1, [], undefined, {}, 'string', {}, []]));

/**
 * Write a function from the below array of number that will return sum of duplicate values.
 * let arr = [10, 20, 40, 10, 50, 30, 10, 60, 10];
 * The function will return 40
 */

function sumOfDuplicates(arr: number[]) {
  let duplicateSum = 0;
  const duplicateItems: number[] = [];
  const existingItems: number[] = [];

  for (const num of arr) {
    if (!existingItems.includes(num)) {
      existingItems.push(num);
    } else {
      if (!duplicateItems.includes(num)) {
        duplicateItems.push(num);
      }

      duplicateSum += num;
    }
  }

  for (const duplicateItem of duplicateItems) {
    duplicateSum += duplicateItem;
  }

  return duplicateSum;
}

console.log(sumOfDuplicates([10, 20, 40, 10, 50, 30, 10, 60, 60, 10]));

/**
 * Write a game of rock, paper, scissor function that will return 'Win' or 'Lose'. The function will randomly pick between rock, paper, or scissor.
 * Example: if you throw a rock as an argument and the function pick a scissor then it will return 'Win'
 */

type RockPaperScissorOption = 'rock' | 'paper' | 'scissor';
function rockPaperScissor(option: RockPaperScissorOption) {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const options: RockPaperScissorOption[] = ['rock', 'paper', 'scissor'];

  const randomizedOption = options[getRandomInt(3)];

  console.log(`You chose ${option}`);
  console.log(`Computer chose ${randomizedOption}`);

  if (option === randomizedOption) {
    console.log(`It's a draw!`);
    return;
  }

  if (
    (option === 'rock' && randomizedOption === 'paper') ||
    (option === 'paper' && randomizedOption === 'scissor') ||
    (option === 'scissor' && randomizedOption === 'rock')
  ) {
    console.log('You lose!');
    return;
  }

  if (
    (option === 'rock' && randomizedOption === 'scissor') ||
    (option === 'paper' && randomizedOption === 'rock') ||
    (option === 'scissor' && randomizedOption === 'paper')
  ) {
    console.log('You win!');
    return;
  }
}

console.log('------------------------------');
rockPaperScissor('scissor');
