import React from 'react'
import ListElement from '../ListElement'

export default function NotesList({notes = []}) {

  if(!Array.isArray(notes) || !notes.length){
    return <h2>Don't exists any note to display, please create one!</h2>
  }

  return (
    <ul>
      { notes.map(note => <ListElement key={note.id} {...note} /> ) }
    </ul>
  )
}
