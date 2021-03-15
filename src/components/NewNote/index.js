import React, { useState } from 'react'
import './styles.css'

export default function NewNote({clickOnButton = () => {}}) {

  const [newNote, setNewNote] = useState('')

  const handleOnChange = (ev) => {
    setNewNote(ev.target.value)
  }

  const handleClick = () => {
    clickOnButton(newNote)
    setNewNote('')
  }

  return (
    <div>
      <input onChange={handleOnChange} name='note' type='text' placeholder='Type new note here' value={newNote} />
      <button onClick={handleClick}>Create</button>
    </div>
  )
}
