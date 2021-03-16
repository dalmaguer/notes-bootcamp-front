import React, { useEffect, useState } from 'react'
import NewNote from './components/NewNote'
import NotesList from './components/NotesList'
import { getNextId } from './utils'
import { getAllWithFetch, newNotesWithFetch } from './services/notes'
import Loading from './components/Loading'
import { useGlobalContext } from './hooks/useGlobalContext'
import { ALERT_MESSAGES } from './constants'

import './App.css'
import AlertMessage from './components/AlertMessage'

function App () {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const { setAlertMessage } = useGlobalContext()

  useEffect(() => {
    setLoading(true)
    getAllWithFetch()
      .then(notesFromApi => {
        setNotes(notesFromApi)
      })
      .catch(error => {
        console.log(error)
        setAlertMessage(ALERT_MESSAGES.ERROR)
      })
      .finally(() => {
        setLoading(false)
      })
    return () => {}
  }, [])

  const handleNewNoteClick = (_newNote) => {
    newNotesWithFetch(_newNote)
      .then(response => {
        setNotes([...notes, {
          ...response,
          id: getNextId(notes)
        }])
        setAlertMessage(ALERT_MESSAGES.CREATED_SUCCESSFULLY)
      })
      .catch(error => {
        console.log(error)
        setAlertMessage(ALERT_MESSAGES.ERROR)
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

      <AlertMessage />
    </div>
  )
}

export default App
