import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import NewNote from './components/NewNote'
import NotesList from './components/NotesList'
import { getNextId } from './utils'
import { getAll, newNote } from './services/notes'
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
    getAll()
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

  const handleCreateNewNote = (_newNote) => {
    newNote(_newNote)
      .then(response => {
        const { error } = response
        if (error) {
          setAlertMessage({
            type: 'error',
            message: error
          })
          return
        }
        setNotes(prevNotes => [...prevNotes, {
          ...response,
          id: getNextId(notes)
        }])
        setAlertMessage(ALERT_MESSAGES.SUCCESS)
      })
      .catch(err => {
        console.log({ err })
        const { response } = err
        const { error } = response.data
        if (error) {
          setAlertMessage({
            type: 'error',
            title: 'ERROR',
            message: error
          })
        }
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

      <LoginForm />

      <div>
        <small>{`(${filteredNotes.length} notes)`}</small>
      </div>

      {loading
        ? <Loading />
        : <NotesList notes={filteredNotes} setNotes={setNotes} />}

      <NewNote createNewNote={handleCreateNewNote} />

      <AlertMessage />
    </div>
  )
}

export default App
