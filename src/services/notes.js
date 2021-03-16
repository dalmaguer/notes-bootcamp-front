import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

// ------------ Fetch ------------------------

export const getAllWithFetch = async () => {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

export const newNotesWithFetch = async (newNote) => {
  if (newNote) {
    // eslint-disable-next-line no-undef
    return fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => {
        return json
      })
  }
}

// --------- Axios ---------------

export const getAll = async () => {
  return axios.get(baseUrl)
    .then(response => {
      return response.data
    })
}

export const newNote = async (newNote) => {
  if (newNote) {
    return axios.post(baseUrl, newNote)
      .then(response => {
        return response.data
      })
  }
}
