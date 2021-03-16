import React, { useEffect } from 'react'
import { useGlobalContext } from '../../hooks/useGlobalContext'
import './styles.css'

export default function AlertMessage () {
  const { alertMessage, setAlertMessage } = useGlobalContext()
  const { message, type } = alertMessage

  useEffect(() => {
    if (message !== '') {
      setTimeout(() => {
        setAlertMessage({ message: '' })
        return () => setAlertMessage({ message: '' })
      }, 4000)
    }
  }, [alertMessage])

  const onClose = () => {
    setAlertMessage({ message: '' })
  }

  const activeClass = message !== '' ? 'active' : ''

  return (

    <div className={`alert-message ${type || 'error'} ${activeClass}`}>
      {message}
      <button className='close-btn' onClick={onClose}>X</button>
    </div>
  )
}
