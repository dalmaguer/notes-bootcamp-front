import React, {useEffect, useState} from 'react'
import NewNote from './components/NewNote'
import NotesList from './components/NotesList'
import _notes from './data/notes'
import {getNextId} from './utils' 

import './App.css'

function App() {

  const [notes, setNotes] = useState(_notes)
  const [showAll, setShowAll] = useState(true)

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

  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }

  const filteredNotes = showAll ? notes : notes.filter(n => n.important===true)

  return (
    <div className="App">
      <h1>My Notes:</h1>
      <button onClick={toggleShowAll}>{showAll ? 'Show only importants' : 'Show all'}</button>
      <NotesList notes={filteredNotes} />
      <NewNote clickOnButton={handleNewNoteClick} />      
    </div>
  )
}

export default App;
