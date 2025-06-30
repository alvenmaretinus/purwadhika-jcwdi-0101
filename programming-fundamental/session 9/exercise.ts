/**
 * store palindrome in variable
 * create array of alphabet
 * split palindrome letters into array
 * filter palindrome array
 *   allow letter if letter is an alphabet
 * join palindrome array
 * create array for reversedString
 * loop palindrome array
 *   push letter to reversedString array
 * join palindrome array into string
 * join reversedString array into string
 * compare palindrome string with reversedString string
 */

function isPalindrome(word: string) {
  let palindrome: string | string[] = word;
  const arrAlpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
  palindrome = palindrome.split('');
  palindrome = palindrome.filter((letter) => {
    return arrAlpha.includes(letter);
  })

  let reversedString: string | string[] = [];
  for (let i = palindrome.length - 1; i >= 0; i--) {
    reversedString.push(palindrome[i]);
  }

  palindrome = palindrome.join('');
  reversedString = reversedString.join('');

  return palindrome === reversedString;
}

console.log(isPalindrome('race, car'));

/**
 * Create a function to convert Excel sheet column title to its corresponding column number.
    Example : 
    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28 
    …
    Example : 
    Input : AB
    Output : 28
 */

// AD
// D = 4 * 26^0
// A = 1 * 26^1

function getColNumber(colTitle: string) {
  const uppercasedColTitle = colTitle.toUpperCase();

  const colTitleArr = uppercasedColTitle.split('');
  let powerCount = 0;
  let sum = 0;

  for (let i = colTitleArr.length - 1; i >= 0; i--) {
    const alphaValue = colTitleArr[i].charCodeAt(0) - 64;
    sum += alphaValue * Math.pow(26, powerCount);
    powerCount++;
  }

  return sum;
}

console.log(getColNumber('AC'))

/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
    Example 1:
    Input: s = "anagram", t = "nagaram"
    Output: true
    Example 2:
    Input: s = "rat", t = "car"
    Output: false
 */

function isAnagram(s: string, t: string) {
  // early exit condition, anagram need to be same length
  if (s.length !== t.length) {
    return false;
  }

  // create Map for `s`, Map(`alphabet` => `count of alphabet`)
  const sMap = s.split('').reduce((acc, curr) => {
    return acc.set(curr, (acc.get(curr) ?? 0) + 1);
  }, new Map());

  // compare `t` with `sMap`
  for (const char of t.split('')) {
    // exit early if [character not found] or [count of character is 0]
    if ((sMap.get(char) ?? 0) === 0) {
      return false;
    } else {
      // update the alphabet count value
      sMap.set(char, sMap.get(char) - 1);
    }
  }
  
  return true;
}
/**
 * time complexity: O(n) because exit early (string length are the same, `s` and `t` can be regarded as 1 variable)
 * space complexity: O(n)
 */

console.log(isAnagram("anagram", "nagaram"))

/**
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
    Example 1:
    Input: nums = [2,2,1]
    Output: 1
    Example 2:
    Input: nums = [4,1,2,1,2]
    Output: 4
    Example 3:
    Input: nums = [1]
    Output: 1
 */

function isNumberAppearedOnce(numArr: number[]) {
  // create Map for `numArr`, Map(`number` => `count of number`)
  const numArrMap = numArr.reduce((acc, curr) => {
    return acc.set(curr, (acc.get(curr) ?? 0) + 1);
  }, new Map());

  // loop through Map and find the one number that appears once
  for (const [number, numberCount] of numArrMap) {
    if (numberCount === 1) {
      return number;
    }
  }
}
/**
 * time complexity: O(n)
 * space complexity: O(n)
 */

console.log(isNumberAppearedOnce([2,2,1]));
console.log(isNumberAppearedOnce([4,1,2,1,2]));
console.log(isNumberAppearedOnce([1]));
