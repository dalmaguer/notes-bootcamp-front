import React from 'react'
import ListElement from '../ListElement'
import { updateNote } from '../../services/notes'
import { useAuthenticatedUser } from '../../hooks/useGlobalContext'

import './styles.css'

export default function NotesList ({ notes = [], setNotes = () => {} }) {
  const { authenticatedUser } = useAuthenticatedUser()

  if (!Array.isArray(notes) || !notes.length) {
    return <h2>No notes to display</h2>
  }

  const setImportant = (id) => {
    let updatedNote
    const newNotes = notes.map(item => {
      if (item.id === id) {
        updatedNote = {
          ...item,
          important: !item.important
        }
        return updatedNote
      } else {
        return item
      }
    })
    // Guardar en bd
    const { token } = authenticatedUser

    updateNote(id, updatedNote, { token })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
        // todo: handle error message
      })

    setNotes(newNotes)
  }

  return (
    <ul className='notes-list'>
      {notes.map(note => <ListElement key={note.id} {...note} setImportant={setImportant} />)}
    </ul>
  )
}
