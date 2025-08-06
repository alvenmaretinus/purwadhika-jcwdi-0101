// DO NOT DO THIS
var box = 'Empty';
box = 'Empty'; // can be a declaration, can be a reassignment

// declaring `let` variable
let headCount = 0;
// variable reassignment
headCount = 100;

// declaring `const` variable
const name = 'Alven';
// cannot be reassigned
// name = 'Andy'; XXXXX

console.log(headCount);
console.log(name);

const human = '1A';

// ===========================
// variable types
// ===========================

/**
 * primitive types
 */

const carBrand = 'Honda'; // String
const word = 'Desa'; // String
const age = 28; // Number - limit is 2^53 - 1
const speedOfLight = 2997924587458738597489578946789547698754967593923475n; // Bigint
const isTeacher = true; // Boolean
const isStudent = false; // Boolean
const whatever = null; // Null - semantically empty - on purpose
let classroom; // Undefined - not on purpose
let classroomA = undefined; // Undefined

console.log('-------------------');
console.log('primitive types');
console.log(carBrand);
console.log(word);
console.log(age);
console.log(speedOfLight);
console.log(isTeacher);
console.log(isStudent);
console.log(whatever);
console.log(classroom);
console.log(classroomA);

/**
 * non primitive types
 */

// array
const fruits = ['banana', 'orange', 'apple', 'watermelon'];
const animals = ['dog', 'cat', 'tiger', 'lion', 'otter'];
// object - `key`: `value`
// variable that stores key value pair of information
const biodata = { name: 'Alven', age: 29, height: 174, job: 'Software Engineer' };
const data = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

console.log('-------------------');
console.log('non primitive types');
console.log(fruits);
console.log(animals);
console.log(biodata);
console.log(data);

// type checking in js
const unknownTypeVar = '34';
console.log('type of unknownTypeVar: ' + typeof unknownTypeVar);

const sentence = 'tHis is a parTicuLarly sHort sENtence';

console.log('-------------------');
console.log(sentence.slice(0, 3));
console.log(sentence.substring(0, 3)); // not that often used
console.log(sentence.toUpperCase());
console.log(sentence.toLowerCase());

// template literals
const familyName = 'Mamapa';
const stringConcatenation = 'David ' + familyName; // xxxxxxx not recommended
const templateLiteral = `David ${familyName}`; // << this is the way to go

console.log('-------------------');
console.log(stringConcatenation);
console.log(templateLiteral);

const houseCount = 3.1497854;
console.log('-------------------');
console.log(houseCount);
console.log(houseCount.toString());
console.log(houseCount.toFixed(3)); // rounded
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);

let a;
// .... a = ???

// even -> a % 2 = 0
// odd -> a % 2 = 1

// increment
let c = 0;
c = c + 2; // long form
c += 2; // short form
c++;

console.log(`c: ${c}`);

const y = '2';
const z = 2;

console.log('-------------------');
console.log(y == z); // compares "value"
console.log(y === z); // compares "value" and "type" - always use this

console.log(abc);
let abc = 123;
