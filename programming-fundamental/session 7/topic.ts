import anything, { myFunction, humanName } from './data'

/**
 * Callback
 */

function greet(username: string, callback: () => void) {
  console.log(`Greetings ${username}!`);

  // main functionality is finished (greet user), call the callback function
  callback();
}

greet('alven', () => {
  console.log('Initialize shopping list...');
})

/**
 * Promise
 */

const secretValue = new Promise((resolve, reject) => {
  // do something...
  setTimeout(() => {
    resolve(586)
  }, 3000)

  // if fail
  if (false) {
    reject('error found, pls try again later')
  }
})

const onFulfilled = (value: unknown) => {
  console.log(`The secret value is ${value}`)
}

const onRejected = (err: string) => {
  console.log(`${err}`)
}

secretValue
  // runs when Promise is fulfilled
  .then(onFulfilled)
  // runs when Promise is rejected
  .catch(onRejected)
  // runs when Promise is settled (fulfilled/rejected)
  .finally(() => {
    console.log('Task completed!')
  })

/**
 * promise (api call example) - old way (Promise methods)
 */

const fetchData = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      return response.json()
    })
    .then(users => {
      console.log(users)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      console.log('Always running!')
    })
}
fetchData()

console.log('-----------------------------')

/**
 * promise (api call example) - new way (async await)
 */

const fetchDataNewWay = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    // if something errors out
    // throw new Error('this is an error message')

    // logging result
    console.log(data);
    console.log('Always running!')
  } catch (error) {
    console.log(error)
  }
}
fetchDataNewWay()

/**
 * imports and exports
 */

console.log(anything)
myFunction()
console.log(humanName)
