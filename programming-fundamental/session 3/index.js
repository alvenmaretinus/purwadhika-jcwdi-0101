/**
 * code to check string palindrome
 */

const word = 'Civic';
const wordLowercased = word.toLowerCase();

// to access string index, use word[index]
// index starts from 0 until string length - 1

let isPalindrome = true;
for (let i = 0; i < Math.floor(wordLowercased.length / 2); i++) {
  // when it violates the palindrome rule, break out of the loop
  if (wordLowercased[i] !== wordLowercased[wordLowercased.length - (i + 1)]) {
    isPalindrome = false;
    break;
  }
}

console.log('---------------------')
console.log(isPalindrome)

/**
 * format number as currency
 */

const givenNumber = 22122211212;
const strNumber = givenNumber.toString();
let result = '';
let count = 0;

for (let i = strNumber.length - 1; i >= 0; i--) {
  result = strNumber[i] + result;
  count++;

  if (count % 3 === 0 && i !== 0) {
    result = "." + result;
  }
}

console.log('---------------------')
console.log(`Rp. ${result},00`)

/**
 * remove substring
 */

function removeFirstOccurrence(str, search) {
  const index = str.indexOf(search);
  if (index === -1) {
    // search string not found, return original string
    return str;
  }
  // Remove the search string from the original string
  return str.slice(0, index) + str.slice(index + search.length);
}

// Example usage:
const string = "Hello world";
const searchString = "ell";

console.log('---------------------')
const substrResult = removeFirstOccurrence(string, searchString);
console.log(substrResult);  // Output: "Ho world"

/**
 * swap capital lowercase letters
 */

function isUpperCase(letter) {
  return letter === letter.toUpperCase() && letter !== letter.toLowerCase();
}

function swapCase(sentence) {
  let swappedWord = [];

  for (let i = 0; i < sentence.length; i++) {
    if (isUpperCase(sentence[i])) {
      swappedWord.push(sentence[i].toLowerCase())
    } else {
      swappedWord.push(sentence[i].toUpperCase())
    }
  }

  return swappedWord.join('');
}

console.log('---------------------')
console.log(swapCase('ThIs Is aN exAmPlE seNTEncE'))

/**
 * larger number of two
 */

const a = 100
const b = 200

console.log('---------------------')

if (a > b) {
  console.log(a)
} else if (a < b) {
  console.log(b)
} else {
  console.log('equal')
}

console.log(Math.max(100, 200))

/**
 * sort numbers
 */

const arrOfNum = [5,2,9]

console.log('---------------------')

// sort ascending
console.log(arrOfNum.sort())

// sort descending
console.log(arrOfNum.sort((a, b) => b - a))

/**
 * check data type
 */

function checkType(input) {
  if (typeof input === 'string') {
    return 1
  } else if (typeof input === 'number') {
    return 2
  } else {
    return 3
  }
}

console.log('---------------------')
console.log(checkType({}))

/**
 * replace letter
 */

function replaceACharacter(sentence, replaceChar) {
  const strArr = []

  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i].toLowerCase() === 'a') {
      strArr.push(replaceChar)
    } else {
      strArr.push(sentence[i])
    }
  }

  return strArr.join('')
}

console.log('---------------------')
console.log(replaceACharacter('An apple a day keeps the doctor away', '*'))
