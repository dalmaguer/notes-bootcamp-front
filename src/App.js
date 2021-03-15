import React, { useEffect, useState } from 'react'
import NewNote from './components/NewNote'
import NotesList from './components/NotesList'
import { getNextId } from './utils'
import { getAllWithFetch, newNotesWithFetch } from './services/notes'
import Loading from './components/Loading'

import './App.css'

function App () {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllWithFetch()
      .then(notesFromApi => {
        setNotes(notesFromApi)
      })
      .finally(() => {
        setLoading(false)
      })
    return () => {}
  }, [])

  const handleNewNoteClick = (_newNote) => {
    newNotesWithFetch(_newNote).then(response => {
      setNotes([...notes, {
        ...response,
        id: getNextId(notes)
      }])
    })
  }

  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }

  const filteredNotes = showAll ? notes : notes.filter(n => n.important === true)

  return (
    <div className='App'>
      <h1>My Notes:</h1>
      <button onClick={toggleShowAll}>{showAll ? 'Show only importants' : 'Show all'}</button>

      <div>
        <small>{`(${filteredNotes.length} notes)`}</small>
      </div>

      {loading
        ? <Loading />
        : <NotesList notes={filteredNotes} />}

      <NewNote clickOnButton={handleNewNoteClick} />
    </div>
  )
}

export default App
