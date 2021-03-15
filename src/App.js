import React, {useEffect, useState} from 'react'
import NewNote from './components/NewNote'
import NotesList from './components/NotesList'
import _notes from './data/notes'
import {getNextId} from './utils' 

import './App.css'

function App() {

  const [notes, setNotes] = useState(_notes)

  useEffect(()=>{
    console.log(notes)
    return () => {}
  },[notes])

  const handleNewNoteClick = (content) => {
    setNotes([...notes, {
      id: getNextId(notes),
      content,
      date: new Date().toISOString(),
      important: false
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
