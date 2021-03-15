import React, { useEffect, useState } from 'react'
import './styles.css'

export default function AlertMessage ({ message = 'Something has happened!', type = 'error' }) {
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false)
      return () => setDisplay(false)
    }, 4000)
  }, [])

  const active = display ? 'active' : ''

  return (
    <div className={`alert-message ${type} ${active}`}>
      {message}
    </div>
  )
}
