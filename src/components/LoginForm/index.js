import React, { useState, useEffect } from 'react'
import { login } from '../../services/login'
import { useGlobalContext } from '../../hooks/useGlobalContext'
import { LOCALSTORAGEINDEX } from '../../constants'

import './styles.css'

const initFormData = {
  username: '',
  password: ''
}

export default function LoginForm () {
  const [formData, setFormData] = useState(initFormData)

  const { setAlertMessage, setAuthenticatedUser } = useGlobalContext()

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      const user = await login(formData)
      if (user.token) {
        window.localStorage.setItem(
          LOCALSTORAGEINDEX.user,
          JSON.stringify(user)
        )
        setAuthenticatedUser(user)
      }
    } catch (err) {
      console.log(err)
      setAlertMessage({
        type: 'error',
        message: 'Wrong credentials'
      })
    }
    setFormData(initFormData)
  }

  useEffect(() => {
    if (!formData.username) {
      console.log('You must logged in')
    }
    return () => {}
  }, [])

  return (
    <form className='loggin-form' onSubmit={handleSubmit}>
      <p>Login</p>
      <input
        type='text'
        name='username'
        placeholder='Username'
        value={formData.username}
        onChange={({ target }) => setFormData({
          ...formData,
          username: target.value
        })}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={({ target }) => setFormData({
          ...formData,
          password: target.value
        })}
      />
      <button>Login</button>
    </form>
  )
}
