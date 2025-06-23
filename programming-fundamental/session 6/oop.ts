/**
 * Typescript interface and type
 */

type Publisher = {
  name: string;
  address: string;
  contact?: number;
}

interface Book {
  author: string;
  title: string;
  year: number;
  publishers: Publisher[];
}

/**
 * Defining object (literal syntax)
 */

const book: Book = {
  author: 'JK Rowling',
  title: 'Harry Potter',
  year: 1996,
  publishers: [
    { name: 'Willey\'s', address: '109 st london' },
    { name: 'Besuka', address: '122 st new york' },
  ]
}

const book2: Book = {
  author: 'Unknown',
  title: 'Percy Jackson',
  year: 2001,
  publishers: []
}

/**
 * Defining object (object constructor)
 */

const book1: any = new Object();
book1.author = 'JK Rowling';
book1.title = 'Harry Potter';
book1.year = 1996;
book1.publishers = [
  { name: 'Willey\'s', address: '109 st london' },
  { name: 'Besuka', address: '122 st new york' },
];

/**
 * Methods on object
 */

const human: Record<string, any> = {
  name: 'Andy',
  age: 32,
  occupation: 'Doctor',
  doJob() {
    console.log(`${this.name}: work work work for 10 hours a day......`)
  },
  eat: function () {
    console.log(`${this.name}: yum yum yum`)
  },
  // arrow method in object don't have access to "this" context
  drink: () => {
    console.log('gulp gulp gulp')
  },
  something: {}
}

human.doJob()

/**
 * Object.keys(), Object.values() and entries
 */

console.log(Object.keys(human)) // returns the keys [key, key ...]
console.log(Object.values(human)) // returns the values [value, value, ...]
console.log(Object.entries(human)) // returns both keys and values [ [key, value], [key, value], ... ]

/**
 * optional chaining
 */

// in the bg: `human.something.thingA ? human.something.thingA.thingZ : undefined`
console.log(human.something.thingA?.thingZ)

/**
 * immutable vs mutable
 */

// immutable
let address = 'Jakarta'
address = 'Pontianak'
console.log(address)

// mutable
const objA = {
  a: 1,
  b: 2,
  c: 3,
}
// what you shouldn't do
const objB = objA;
// what you should do
// const objB = { ...objA }
objB.b = 100
console.log(objA)
console.log(objB)

/**
 * for in loop
 */

const person: Record<string, any> = {
  name: 'Frengky',
  age: 24
}

for (let key in person) {
  console.log(person[key])
}

/**
 * array destructuring
 */

const arr = ['apple', 'melon', 'tomato']
let [ fruit1, fruit2, fruit3 ] = arr
console.log(fruit1)
console.log(fruit2)
console.log(fruit3)

/**
 * object destructuring
 */

const teacher = {
  name: 'Alven',
  age: 29,
  occupation: 'SWE',
  address: 'Singapore'
}
const { age, name: teacherName, occupation: teacherJob } = teacher
console.log(age, teacherName, teacherJob)


/**
 * spread operator (obj and arr)
 */

// array
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
console.log([...arr1, ...arr2])

//object
console.log({ ...teacher, ...book1 })

/**
 * this keyword
 */

// global object
console.log(this)

console.log('--------------------------------')

/**
 * initializing class and object
 */

class HumanBeing {
  name: string = '';
  age = 0;
  height = 0;
  job = '';

  constructor(name: string, age: number, height: number) {
    this.name = name;
    this.age = age;
    this.height = height;
  }

  walk() {
    console.log(`${this.name} is walking!`)
  }

  sit() {
    console.log(`${this.name} is sitting!`)
  }

  eat() {
    console.log(`${this.name} is eating!`)
  }

  laugh() {
    console.log(`${this.name} is laughing!`)
  }
}

const randomHuman = new HumanBeing('Budi', 56, 175);
const randomHuman1 = new HumanBeing('Andi', 24, 190);
randomHuman.walk();
randomHuman1.walk();
console.log(randomHuman.age)

/**
 * static in OOP
 */

class Calculator {
  static something: any;

  static add(a: number, b: number) {
    return a + b;
  }
}

console.log(Calculator.add(2, 3)); // Output: 5

const calc = new Calculator();
// console.log(calc.add(2, 3)); // ❌ Error: add is not a function

/**
 * getter and setter
 * used when you want to create "computed" attributes in an class/obj
 */

class Pet {
  private family: string = '';
  private type: string = '';
  private race: string = '';

  get fullName() {
    return `${this.race} ${this.type}`;
  }

  set fullName(newName: string) {
    // validation
    if (newName.split(' ').length < 2) {
      console.log('name format is not correct!')
      return;
    }

    this.race = newName.split(' ')[0]
    this.type = newName.split(' ')[1]
  }
}

const pet = {
  family: 'Mamalia',
  type: 'Dog',
  race: 'Pomeranian',
  get fullName() {
    return `${this.race} ${this.type}`;
  },
  set fullName(newName: string) {
    // validation
    if (newName.split(' ').length < 2) {
      console.log('name format is not correct!')
      return;
    }

    this.race = newName.split(' ')[0]
    this.type = newName.split(' ')[1]
  }
}

console.log(pet.fullName)
pet.fullName = ''
console.log(pet.fullName)

/**
 * Inheritance
 */

class Product {
  name: string = '';
  protected price: number = 0;
  type: 'consumable' | 'digital' | null = null;

  constructor() {
    console.log('Product is initialized')
  }
}

class PublishedBook extends Product {
  author: string = '';

  constructor() {
    super()
    console.log('Book is initialized')
  }

  getInfo() {
    console.log(this.name, this.price, this.type)
  }
}

const newBook = new PublishedBook()
newBook.name = 'book name'
// Property 'price' is protected and only accessible within class 'Product' and its subclasses.
// newBook.price = 1000000
newBook.getInfo()


/**
 * instanceof
 * The instanceof operator allows to check whether an object belongs to a certain class. It also takes inheritance into account.
 */

console.log(newBook instanceof PublishedBook)
console.log(newBook instanceof Product)
console.log(newBook instanceof Pet)
