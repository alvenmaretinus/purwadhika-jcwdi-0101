const number = 22122211212;

let result;

const numberStringify = number.toString();
const arr = [];

// if it doesn't excess 1000 just return immediately
if (number < 1000) {
  result = numberStringify;
} else {
  for (let i = 0; i < numberStringify.length; i++) {
    // adding numberStringfy backward to arr
    const lastNumberIndex = numberStringify.length - 1 - i;
    arr.splice(0, 0, numberStringify[lastNumberIndex]);
    // every 3 digits of number add "." infront of it, except if it's the last 3 digits index
    if ((i + 1) % 3 === 0 && i + 1 < numberStringify.length) {
      arr.splice(0, 0, '.');
    }
  }
  // convert back to string and assign to result
  result = arr.join('');
}

result = `Rp. ${result},00`;

console.log(result);
