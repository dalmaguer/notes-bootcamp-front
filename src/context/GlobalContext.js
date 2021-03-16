import { createContext, useState } from 'react'

const Context = createContext()

export function GlobalContextProvider ({ children }) {
  const [alertMessage, setAlertMessage] = useState({
    message: ''
  })

  return (
    <Context.Provider
      value={{
        alertMessage,
        setAlertMessage
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
