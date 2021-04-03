import { useGlobalContext } from './useGlobalContext'
import { ALERT_MESSAGES } from '../constants'

export function useAlertMessage () {
  const { setAlertMessage } = useGlobalContext()

  const successMessage = (objParam = ALERT_MESSAGES.SUCCESS) => {
    const { message = 'SUCCESS', title = '' } = objParam
    setAlertMessage({
      type: 'success',
      title,
      message
    })
  }

  const infoMessage = (objParam) => {
    const { message = '', title = '' } = objParam
    setAlertMessage({
      type: 'info',
      title,
      message
    })
  }

  const errorMessage = (objParam = ALERT_MESSAGES.ERROR) => {
    const { error = ALERT_MESSAGES.ERROR, title = '' } = objParam
    const { message } = objParam

    const { response } = error

    let errorMessage
    if (message) {
      errorMessage = message
    } else if (response && response.data && response.data.error) {
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
    errorMessage,
    infoMessage
  }
}
