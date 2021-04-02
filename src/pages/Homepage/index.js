import React, { useEffect, useState } from 'react'
import NewNote from '../../components/NewNote'
import NotesList from '../../components/NotesList'
import { getAll, createNote } from '../../services/notes'
import Loading from '../../components/Loading'
import { useAuthenticatedUser } from '../../hooks/useGlobalContext'
import { useAlertMessage } from '../../hooks/useAlertMessage'
// import { ALERT_MESSAGES } from '../../constants'

export default function Homepage () {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const { authenticatedUser } = useAuthenticatedUser()
  const { successMessage, errorMessage } = useAlertMessage()

  useEffect(() => {
    setLoading(true)
    getAll()
      .then(notesFromApi => {
        setNotes(notesFromApi)
      })
      .catch(error => {
        // setAlertMessage(ALERT_MESSAGES.ERROR)
        errorMessage({ error })
      })
      .finally(() => {
        setLoading(false)
      })
    return () => {}
  }, [])

  const handleCreateNewNote = (_newNote) => {
    const { token } = authenticatedUser

    createNote(_newNote, { token })
      .then(response => {
        const { error } = response
        if (error) {
          errorMessage({ error })
          return
        }
        setNotes(prevNotes => [...prevNotes, {
          ...response
        }])
        successMessage()
      })
      .catch(error => {
        errorMessage({ error })
      })
  }

  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }

  const filteredNotes = showAll ? notes : notes.filter(n => n.important === true)

  return (
    <>
      <h1>My Notes:</h1>

      <button onClick={toggleShowAll}>
        {showAll ? 'Show only importants' : 'Show all'}
      </button>

      <div>
        <small>{`(${filteredNotes.length} notes)`}</small>
      </div>

      <NewNote createNewNote={handleCreateNewNote} />

      {loading
        ? <Loading />
        : <NotesList notes={filteredNotes} setNotes={setNotes} />}
    </>
  )
}
