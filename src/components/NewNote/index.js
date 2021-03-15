import React, { useState } from 'react'
import './styles.css'

const emptyNote = {
  id: '-1',
  content: '',
  date: new Date().toISOString(),
  important: false
}

export default function NewNote ({ clickOnButton = () => {} }) {
  const [newNote, setNewNote] = useState(emptyNote)

  const handleOnChange = (ev) => {
    setNewNote({
      ...newNote,
      content: ev.target.value
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    clickOnButton(newNote)
    setNewNote(emptyNote)
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input onChange={handleOnChange} name='note' type='text' placeholder='Type new note here' value={newNote.content} />
      <button>Create</button>
    </form>
  )
}
