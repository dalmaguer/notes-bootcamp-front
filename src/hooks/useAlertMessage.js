import { useGlobalContext } from './useGlobalContext'
import { ALERT_MESSAGES } from '../constants'

export function useAlertMessage () {
  const { setAlertMessage } = useGlobalContext()

  const successMessage = (objParam = ALERT_MESSAGES.SUCCESS) => {
    const { message, title = '' } = objParam
    setAlertMessage({
      type: 'success',
      title,
      message
    })
  }

  const errorMessage = (objParam = ALERT_MESSAGES.ERROR) => {
    let { error = ALERT_MESSAGES.ERROR, title = '' } = objParam
    const { message } = objParam
    if (message) {
      error = message
    }

    const { response } = error

    let errorMessage = 'Error'
    if (response && response.data && response.data.error) {
      errorMessage = response.data.error
    } else if (error.message) {
      errorMessage = message
    } else {
      errorMessage = error
    }
    setAlertMessage({
      type: 'error',
      title,
      message: errorMessage
    })
  }

  return {
    successMessage,
    errorMessage
  }
}
