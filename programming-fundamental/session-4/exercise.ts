/**
 * draw triangle numbers
 * @param height
 */

function drawNumbersTriangle(height: number) {
  function printConsecutiveNumber(end: number) {
    const arr = [];

    for (let i = 1; i <= end; i++) {
      arr.push(i);
    }

    console.log(arr.join(' '));
  }

  for (let i = 1; i <= height; i++) {
    printConsecutiveNumber(i);
  }
}

drawNumbersTriangle(10);

/**
 * find max value in array of numbers
 */

function maxNum(arr: number[]) {
  let currMax = 0;

  for (let num of arr) {
    if (currMax < num) {
      currMax = num;
    }
  }

  return currMax;
}

console.log('----------------------------------');
console.log(maxNum([58, 900, 1, 45, 100, 23]));

/**
 * function that splits string to array of words
 */

const splitSentence = (sentence: string) => sentence.split(' ');

console.log('----------------------------------');
console.log(splitSentence('this is an example sentence'));

/**
 * triangle pattern exercise
 */

//Function printTriangle returns a sequence of numbers starting from 1 in a triangle
function printTriangle(height: number) {
  for (let i = 1; i <= height; i++) {
    let arr = [];
    for (let j = 0; j < i; j++) {
      arr.push(iterator.next().value);
    }
    console.log(arr.join(' '));
  }
}

//function yieldNum yields a number as a string evertime it's called starting from 1.
//for numbers less than 10 we return with a 0 as a prefix
function* yieldNum() {
  let x = 1;
  while (x < 10) {
    yield '0' + x.toString();
    x++;
  }
  while (true) {
    yield x.toString();
    x++;
  }
}

let iterator = yieldNum();

console.log('----------------------------------');
printTriangle(9);
