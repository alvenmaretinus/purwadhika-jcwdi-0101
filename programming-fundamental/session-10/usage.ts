import Stack from './Stack';
import Queue from './Queue';
import SingleLinkedList from './SingleLinkedList';

/**
 * Stack
 */

const stack = new Stack(5);

stack.push(1);
console.log(stack.getElements());
stack.push(50);
console.log(stack.getElements());
stack.push(100);
console.log(stack.getElements());
stack.push(12);
console.log(stack.getElements());
stack.push('sdad');
console.log(stack.getElements());

stack.pop();
console.log(stack.getElements());

console.log('------------------------------');

/**
 * Queue
 */

const queue = new Queue();

queue.enqueue('Andy');
queue.enqueue('Marco');
queue.enqueue('Robbie');
queue.enqueue('Susan');
queue.enqueue('Lucy');

console.log(queue.getElements());

console.log(queue.dequeue());

console.log(queue.getElements());

console.log('------------------------------');

/**
 * Set
 */

const fruits: string[] = ['banana', 'apple', 'jackfruit', 'apple'];
const fruitsSet = new Set(fruits);

fruitsSet.add('durian');
console.log(fruitsSet);

fruitsSet.delete('banana');
console.log(fruitsSet);

console.log(fruitsSet.has('apple'));

console.log(fruitsSet.size);

console.log(fruitsSet.entries());

fruitsSet.forEach((fruit) => {
  console.log(fruit);
});

fruitsSet.clear();
console.log(fruitsSet);

// converting Set to array
console.log([...fruitsSet]);
console.log(Array.from(fruitsSet));

console.log('------------------------------');

/**
 * Hash table - Object
 */

const obj: Record<string, string> = {
  David: '001',
  Buchanan: '002',
};

obj['Cherry'] = '003';
obj.Hendra = '004';

console.log(obj);
console.log(obj['Buchanan']);

console.log('------------------------------');

/**
 * Hash table - Map
 */

const map = new Map<string, string>([
  ['Alven', '000'],
  ['Alven', '000'],
  ['Alven', '010'],
]);

map.set('David', '001');
map.set('Buchanan', '001');

console.log(map);
console.log(map.get('David'));

console.log('------------------------------');

/**
 * Single Linked List
 */

const linkedList = new SingleLinkedList();

linkedList.add('A');
linkedList.add('B');
linkedList.add('C');

linkedList.printList();

console.log('-----');
linkedList.insertAt('BBB', 1);
linkedList.printList();

console.log('-----');
linkedList.removeElement('A');
linkedList.printList();

console.log('-----');
linkedList.removeAt(2);
linkedList.printList();
