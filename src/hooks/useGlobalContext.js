import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

export function useGlobalContext () {
  const { alertMessage, setAlertMessage } = useContext(GlobalContext)
  return {
    alertMessage,
    setAlertMessage
  }
}
