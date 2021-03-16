import React from 'react'
import ListElement from '../ListElement'

export default function NotesList ({ notes = [], setNotes = () => {} }) {
  if (!Array.isArray(notes) || !notes.length) {
    return <h2>Don't exists any note to display, please create one!</h2>
  }

  const setImportant = (id) => {
    const newNotes = notes.map(item => {
      if (item.id === id) {
        return {
          ...item,
          important: !item.important
        }
      } else {
        return item
      }
    })
    setNotes(newNotes)
  }

  return (
    <ul>
      {notes.map(note => <ListElement key={note.id} {...note} setImportant={setImportant} />)}
    </ul>
  )
}
