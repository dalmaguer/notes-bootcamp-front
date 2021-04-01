import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

export function useGlobalContext () {
  const { alertMessage, setAlertMessage, authenticatedUser, setAuthenticatedUser } = useContext(GlobalContext)
  return {
    alertMessage,
    authenticatedUser,
    setAlertMessage,
    setAuthenticatedUser
  }
}

export function useAlertMessage () {
  const { alertMessage, setAlertMessage } = useContext(GlobalContext)
  return {
    alertMessage,
    setAlertMessage
  }
}

export function useAuthenticatedUser () {
  const { authenticatedUser, setAuthenticatedUser } = useContext(GlobalContext)
  return {
    authenticatedUser,
    setAuthenticatedUser
  }
}
