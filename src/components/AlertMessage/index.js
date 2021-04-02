import React, { useEffect } from 'react'
import { useGlobalContext } from '../../hooks/useGlobalContext'
import './styles.css'

export default function AlertMessage () {
  const { alertMessage, setAlertMessage } = useGlobalContext()
  const { type, title, message } = alertMessage

  const cleanAlertMessage = () => {
    setAlertMessage({ ...alertMessage, message: '' })
  }

  useEffect(() => {
    let to
    if (message !== '') {
      to = window.setTimeout(() => {
        cleanAlertMessage()
        // return () => cleanAlertMessage()
      }, 4000)
    }
    return () => window.clearTimeout(to)
  }, [alertMessage])

  const onClose = () => {
    cleanAlertMessage()
  }

  const activeClass = message !== '' ? 'active' : ''

  return (
    <div className={`alert-message ${type || 'error'} ${activeClass}`}>
      {title && title !== '' && <div className='alert-title'>{title}</div>}
      {message}
      <button className='close-btn' onClick={onClose}>X</button>
    </div>
  )
}
