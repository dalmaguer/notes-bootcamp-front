import React from 'react'
import AlertMessage from './components/AlertMessage'
import HomePage from './pages/Homepage'
import LoginForm from './components/LoginForm'
import { useAuthenticatedUser } from './hooks/useGlobalContext'

import './App.css'

function App () {
  const { authenticatedUser } = useAuthenticatedUser()

  return (
    <div className='app container'>
      {
        authenticatedUser === null
          ? <LoginForm />
          : <HomePage />
      }
      <AlertMessage />
    </div>
  )
}

export default App
