/**
 * Ways of defining an array
 */

// standard way
const boxOfFruits1 = ['apple', 'mango', 'watermelon'];
const students = [
  { firstName: 'Allen', lastName: 'Smith', age: 29 },
  { firstName: 'Barry', lastName: 'Aaron', age: 32 },
  { firstName: 'Charlie', lastName: 'Anything', age: 25 },
];

// array object way
const boxOfFruits2 = new Array('apple', 'mango', 'watermelon');

/**
 * Commonly used methods
 */

// push
// add an element to the end of the array
boxOfFruits1.push('durian');
console.log(boxOfFruits1);

// unshift
// add an element to the start of the array
boxOfFruits1.unshift('rambutan');
console.log(boxOfFruits1);

// destructuring (ES6)
const moreFruits = ['pear', ...boxOfFruits1, ...boxOfFruits2, 'melon'];
console.log(moreFruits);

// pop
// remove an item from array (last item)
boxOfFruits2.pop();
console.log(boxOfFruits2);

// length
// get array size
console.log(moreFruits.length);

// join
// converts array to string
console.log(moreFruits.join(', '));

// sort ascendingly
// sort the array contents ascendingly
console.log(moreFruits.sort());

// sort descendingly
// sort the array contents descendingly
console.log(moreFruits.sort((a, b) => b.localeCompare(a)));

// includes
// check if the array contains specific content
console.log(moreFruits.includes('cat'));
console.log(moreFruits.includes('melon'));

// map
// run a function on all of the array contents, return something new
const compactStudents = students.map(function (student) {
  return {
    name: `${student.firstName} ${student.lastName}`,
    age: student.age,
  };
});
console.log(compactStudents);

/**
 * for of loop for array
 */

const names = ['Andy', 'Budi', 'Candy'];
for (let name of names) {
  console.log(name);
}
