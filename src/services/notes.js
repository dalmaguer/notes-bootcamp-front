import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

export const getAllWithFetch = async () => {
  return fetch(baseUrl)
    .then(response => response.json())
    .then(json => {
      const normalizedData = json.map(item => normalizeDataFromApi(item))
      return normalizedData
    })
    .catch(error => {
      console.log(error)
      return []
    })
}

export const getAll = async () => {
  return axios.get(baseUrl)
    .then(response => {
      const normalizedData = response.data.map(item => normalizeDataFromApi(item))
      return normalizedData
    })
    .catch(error => {
      console.log(error)
      return []
    })
}

export const newNote = async (newNote) => {
  if (newNote) {
    const normalized = normalizeDataForApi(newNote)
    // console.log(newNote, normalized)
    return axios.post(baseUrl, normalized)
      .then(response => {
        return normalizeDataFromApi(response.data)
      })
      .catch(error => {
        console.log(error)
        return []
      })
  }
}

// Formating data from Jsonplaceholder Api
const normalizeDataFromApi = data => {
  return {
    id: data.id,
    content: data.title,
    date: '2019-05-30T17:30:31.098Z',
    important: Math.floor(Math.random() * 10) >= 5
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
