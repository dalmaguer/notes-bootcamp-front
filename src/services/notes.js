import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

let config = {}

export const setToken = token => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

// ------------ Fetch ------------------------

export const getAllWithFetch = () => {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

export const createNoteWithFetch = (newNote) => {
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

// --------- Axios ---------------

export const getAll = () => {
  return axios.get(baseUrl)
    .then(response => {
      return response.data
    })
}

export const createNote = (newNote) => {
  return axios.post(baseUrl, newNote, config)
    .then(response => {
      return response.data
    })
}

export const updateNote = (id, updatedNote) => {
  return axios.put(`${baseUrl}/${id}`, updatedNote, config)
    .then(response => {
      return response.data
    })
}

export const deleteNote = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config)
    .then(response => {
      return response.data
    })
}
