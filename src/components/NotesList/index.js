import React from 'react'
import ListElement from '../ListElement'

import './styles.css'

export default function NotesList ({
  notes = [],
  onChangeImportance = () => {},
  onDelete = () => {}
}) {
  if (!Array.isArray(notes) || !notes.length) {
    return <h2>No notes to display</h2>
  }

  return (
    <ul className='notes-list'>
      {notes.map(note =>
        <ListElement
          key={note.id} {...note}
          setImportant={onChangeImportance}
          onDelete={onDelete}
        />)}
    </ul>
  )
}
