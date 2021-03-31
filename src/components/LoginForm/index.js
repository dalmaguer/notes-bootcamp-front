import React, { useState, useEffect } from 'react'
// import { login } from '../../services/users'

import './styles.css'

const initFormData = {
  username: '',
  password: ''
}

export default function LoginForm () {
  const [formData, setFormData] = useState(initFormData)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log('Submit', { formData })
    // TODO: Login form services
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
