/**
 * if statement
 */

const color = 'green';

if (color === 'red') {
  console.log("it's apple!");
} else if (color === 'yellow') {
  console.log("it's melon!");
} else if (color === 'green') {
  console.log("it's watermelon!");
} else {
  console.log("it's not a fruit!")
}

/**
 * switch statement / switch case
 */

const grade = 'C';

switch (grade) {
  case 'A':
    console.log('Excellent!');
    break;
  case 'B':
    console.log('Good!');
    break;
  case 'C':
  case 'D':
  case 'E':
    console.log('Bad!');
    break;
  default:
    console.log('Did you study???');
}

/**
 * Ternary
 */

const genderInBahasa = 'Laki-laki';

// ternary - shorter
let gender = genderInBahasa === 'Laki-laki' ? 'Male' : 'Female';

// traditional if statement - longer
if (genderInBahasa === 'Laki-laki') {
  gender = 'Male';
} else {
  gender = 'Female';
}

console.log(gender)

/**
 * Logical operators (&& || !)
 */

const isRaining = true
const haveUmbrella = false
if (isRaining && !haveUmbrella) {
  console.log('stay at home!')
} else {
  console.log('go out anyways')
}

/**
 * Short circuiting (&& ||)
 */

const a = 10
const b = ''
const c = 'Hello'
const d = false

console.log(a && b && c && d) // ''
console.log(a || b || c || d) // 10

/**
 * Pseudocode in conditional statement
 */

const numberToCheck = 10;
let isEven; // undefined

if (numberToCheck % 2 === 0) {
  isEven = true
} else {
  isEven = false
}

console.log(isEven)

// turn this into ternary!
isEven = numberToCheck % 2 === 0 ? true : false

// further improvement
isEven = numberToCheck % 2 === 0

/**
 * Loop statements
 */

// for loop
console.log('====== for loop ======')
for (let i = 0; i < 4; i++) {
  console.log(i)
}

// while loop
console.log('====== while loop ======')
let i = 0
while (i < 4) {
  console.log(i)
  i++
}

// infinite loop, dont do this!!
// while (true) {
//   console.log('to the infinity!')
// }

// do while loop
console.log('====== do while loop ======')
// will always run at least ONCE
do {
  console.log('hahahah')
} while (false)

/**
 * pseudocode - factorial of 6 (6!) - 6 x 5 x 4 x 3 x 2 x 1
 */

let result = 1;
for (let i = 6; i > 0; i--) {
  // result = result * i
  result *= i
}

console.log('====== factorial of 6 ======')
console.log(6 * 5 * 4 * 3 * 2 * 1)
console.log(result)

/**
 * check prime
 */

// incorrect formula, but on the right track
function isPrime(i) {
  if (i <= 1) {
      return false
  }
  if (i == 2) {
      return true
  }
  if (i == 3) {
      return true
  }
  for (let j = 3; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
          return false
      } 
  }
  return true
}

for (let i = 10; i > 0 ; i--) {
  console.log(`${i} is${isPrime(i) ? '' : ' not'} a prime`)
}

console.log(isPrime(4))

/**
 * fibonacci
 * 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
 */

let fibNumbers = [];
for (let i = 0; i < 10; i++) {
  if (i === 0 || i === 1) {
    fibNumbers.push(i)
    continue;
  }

  fibNumbers.push(fibNumbers[i - 2] + fibNumbers[i - 1])
}

console.log('====== fibonnaci ======')
console.log(fibNumbers)

//Function fibNumbers obtains all the fibonacci numbers
function getFibNumbers(i) {
  let x = [];
  for (let j = 0; j < i; j++){
      if (j <= 1){
          x.push(j);
          continue;
      } 
      x.push(x[j-1] + x[j-2]);
  }
  return x
}

console.log(getFibNumbers(10))
