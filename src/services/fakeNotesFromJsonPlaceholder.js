import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

// ------------ Fetch ------------------------

export const getAllWithFetch = async () => {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl)
    .then(response => response.json())
    .then(json => {
      const normalizedData = json.map(
        item => normalizeDataFromApi(item))
      return normalizedData
    })
}

export const newNotesWithFetch = async (newNote) => {
  if (newNote) {
    const normalized = normalizeDataForApi(newNote)
    // eslint-disable-next-line no-undef
    return fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(normalized),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => {
        return normalizeDataFromApi(json)
      })
  }
}

// --------- Axios ---------------

export const getAll = async () => {
  return axios.get(baseUrl)
    .then(response => {
      const normalizedData = response.data.map(
        item => normalizeDataFromApi(item))
      return normalizedData
    })
}

export const newNote = async (newNote) => {
  if (newNote) {
    const normalized = normalizeDataForApi(newNote)
    return axios.post(baseUrl, normalized)
      .then(response => {
        return normalizeDataFromApi(response.data)
      })
  }
}

// Formating data from Jsonplaceholder Api
const normalizeDataFromApi = data => {
  return {
    id: data.id,
    content: data.title,
    date: '2019-05-30T17:30:31.098Z',
    important: Math.floor(Math.random() * 10) > 5
  }
}

// Formating data for Jsonplaceholder Api
const normalizeDataForApi = note => {
  return {
    title: note.content,
    body: note.content,
    userId: 1
  }
}
