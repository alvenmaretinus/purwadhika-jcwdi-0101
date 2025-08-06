/**
 * Function capitalize capitalizes the first letter
 * of every word in the string
 */

// "hello world"
// ["hello", "world"]
function capitalize(x) {
  let words = x.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = String(words[i]).charAt(0).toUpperCase() + String(words[i]).slice(1);
  }
  return words.join(' ');
}

console.log(capitalize('hello world'));
