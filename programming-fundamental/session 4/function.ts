/**
 * declaring function
 */

// function declaration
function greetUser(username: string) {
  console.log(`Hello, ${username}!`)
}
greetUser('Andy')

// function return value
function sumNumbers(a: number, b: number): number | undefined {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return;
  }

  return a + b;
}
console.log(sumNumbers(10, 3));

// function expression
const greetUserAgain = function (username: string) {
  console.log(`Hello, ${username}!`)
}
greetUserAgain('Budi')

// arrow function
const greetUserAgainAgain = (username: string) => {
  console.log(`Hello, ${username}!`)
}
greetUserAgainAgain('Charlie')

// arrow function - return immediately
const divideNumbers = (a: number, b: number) => a / b;
console.log(divideNumbers(30, 6))

// function passes to a function
function operateNumbers(divide: (a: number, b: number) => number, numA: number, numB: number) {
  return divide(numA, numB)
}
console.log(operateNumbers(divideNumbers, 100, 2))

/**
 * default parameter in functions
 */

function callUser(name = 'default user') {
  console.log(`welcome ${name}!`)
}
callUser('Alven')

/**
 * rest parameters
 */

function printNumbers(a: number, b: number, c: number, ...restNumbers: number[]) {
  console.log(a, b, c, restNumbers)
}
printNumbers(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

/**
 * nested function
 */

function wakeUp() {
  function openEyes() {
    console.log('open eyes')
  }

  function sitOnBed() {
    console.log('sit on bed')
  }

  function standUp() {
    console.log('stand up')
  }

  function walkToToilet() {
    console.log('walk to toilet')
  }

  openEyes()
  sitOnBed()
  standUp()
  walkToToilet()
}

wakeUp()

/**
 * currying
 */

function multiplier(a: number, b: number, c: number) {
  return a * b * c;
}

function multiplierCurry(a: number) {
  return function (b: number) {
    return function (c: number) {
      return a * b * c;
    }
  }
}

console.log(multiplier(2, 3, 4))
console.log(multiplierCurry(2)(3)(4))

/**
 * recursion / recursive
 * function calling itself from inside
 */

function countDown(fromNumber: number) {
  console.log(fromNumber)

  let nextNumber = fromNumber - 1;

  if (nextNumber > 0) {
    return countDown(nextNumber)
  }
}

countDown(8)
