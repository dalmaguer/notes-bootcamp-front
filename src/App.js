import React, { useEffect, useState } from 'react'
import NewNote from './components/NewNote'
import NotesList from './components/NotesList'
import { getNextId } from './utils'
import { getAllWithFetch, newNotesWithFetch } from './services/notes'
import Loading from './components/Loading'

import './App.css'
import AlertMessage from './components/AlertMessage'

function App () {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: 'error'
  })

  useEffect(() => {
    setLoading(true)
    getAllWithFetch()
      .then(notesFromApi => {
        setNotes(notesFromApi)
      })
      .catch(error => {
        setAlertMessage({
          message: error,
          type: 'error'
        })
      })
      .finally(() => {
        setLoading(false)
      })
    return () => {}
  }, [])

  useEffect(() => {
    const to = setTimeout(() => {
      setAlertMessage({
        ...alertMessage,
        message: ''
      })
    }, 5000)
    return () => clearTimeout(to)
  }, [alertMessage])

  const handleNewNoteClick = (_newNote) => {
    newNotesWithFetch(_newNote).then(response => {
      setNotes([...notes, {
        ...response,
        id: getNextId(notes)
      }])
      setAlertMessage({
        message: 'Operation was completed successfully!',
        type: 'success'
      })
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

      {alertMessage.message !== '' && <AlertMessage {...alertMessage} />}
    </div>
  )
}

export default App
