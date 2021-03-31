import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

export const login = async (loginData = {}) => {
  return axios.post(baseUrl, loginData)
    .then(response => {
      return response.data
    })
}
