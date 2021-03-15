import React, {useEffect, useState} from 'react'
import NewNote from './components/NewNote'
import NotesList from './components/NotesList'
import _notes from './data/notes'
import {getNextId} from './utils' 

import './App.css'

function App() {

  const [notes, setNotes] = useState(_notes)

  useEffect(()=>{
    // do something here
    // console.log(notes)
    return () => {}
  },[notes])

  const handleNewNoteClick = (newNote) => {
    setNotes([...notes, {
      ...newNote,
      id: getNextId(notes)
    }])
  }

  return (
    <div className="App">
      <h1>My Notes:</h1>
      <NotesList notes={notes} />
      <NewNote clickOnButton={handleNewNoteClick} />      
    </div>
  )
}

export default App;
