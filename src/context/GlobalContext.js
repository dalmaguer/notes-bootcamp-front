import { createContext, useEffect, useState } from 'react'
import { LOCALSTORAGEINDEX } from '../constants'
import { setToken } from '../services/notes'

const Context = createContext()

export function GlobalContextProvider ({ children }) {
  const [alertMessage, setAlertMessage] = useState({
    type: '',
    message: ''
  })
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem(LOCALSTORAGEINDEX.user))
    if (user && user.token) {
      setAuthenticatedUser(user)
      setToken(user.token)
    }
  }, [])

  return (
    <Context.Provider
      value={{
        alertMessage,
        authenticatedUser,
        setAlertMessage,
        setAuthenticatedUser
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
