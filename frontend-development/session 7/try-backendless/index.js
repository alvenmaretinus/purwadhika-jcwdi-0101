import axios from 'axios';
import dotenv from 'dotenv';

// initialize .env
dotenv.config();

const basicFetchRequest = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/7');
    const data = await response.json();
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

const axiosFetchRequest = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/7');
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

// basicFetchRequest();
// axiosFetchRequest();

/**
 * Try using backendless
 */

const actorUrl = `https://api.backendless.com/${process.env.BACKENDLESS_APPLICATION_ID}/${process.env.BACKENDLESS_API_KEY}/data/${'Actor'}`;

/**
 * GET request - fetch all
 */
const getActors = async () => {
  try {
    const response = await axios.get(actorUrl)
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

/**
 * GET request - fetchSpecific user
 */
const getActor = async (id) => {
  try {
    const response = await axios.get(`${actorUrl}/${id}`)
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

/**
 * POST request
 */
const addActor = async (firstName, lastName) => {
  try {
    const response = await axios.post(actorUrl, {
      firstName,
      lastName,
    })
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

/**
 * PUT/PATCH request
 */
const updateActorLastName = async (id, lastName) => {
  try {
    const response = await axios.put(`${actorUrl}/${id}`, {
      lastName
    })
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

/**
 * DELETE request
 */
const deleteActor = async (id) => {
  try {
    const response = await axios.delete(`${actorUrl}/${id}`)
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}

// getActors()
// getActor('1DC83BD3-A578-4515-B3F1-86EC3CA504C2')
// addActor('Budi', 'Susanto')
// updateActorLastName('032e2e9b-90be-4649-988e-dce8662cbfc9', 'WHITE')
// deleteActor('0852ff32-4f31-4230-82ab-787d437506d8')
