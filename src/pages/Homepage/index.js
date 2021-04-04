import React, { useEffect, useState } from 'react'
import NewNote from '../../components/NewNote'
import NotesList from '../../components/NotesList'
import {
  getAll,
  createNote,
  updateNote,
  deleteNote,
  setToken
} from '../../services/notes'
import Loading from '../../components/Loading'
import { useAuthenticatedUser } from '../../hooks/useGlobalContext'
import { useAlertMessage } from '../../hooks/useAlertMessage'
import { LOCALSTORAGEINDEX } from '../../constants'

export default function Homepage () {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const { authenticatedUser, setAuthenticatedUser } = useAuthenticatedUser()
  const { successMessage, errorMessage } = useAlertMessage()

  useEffect(() => {
    setLoading(true)
    getAll()
      .then(notesFromApi => {
        setNotes(notesFromApi)
      })
      .catch(error => {
        errorMessage({ error })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const { token } = authenticatedUser
    setToken(token)
  }, [])

  const handleCreateNewNote = (_newNote) => {
    return createNote(_newNote)
      .then(response => {
        const { error } = response
        if (error) {
          errorMessage({ error })
          return
        }
        setNotes(prevNotes => [...prevNotes, {
          ...response
        }])
        successMessage({ message: 'New note created successfully' })
      })
      .catch(() => {
        errorMessage()
      })
  }

  const handleLogOut = () => {
    setAuthenticatedUser(null)
    setToken('')
    window.localStorage.removeItem(LOCALSTORAGEINDEX.user)
  }

  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }

  const filteredNotes = showAll ? notes : notes.filter(n => n.important === true)

  const handleChangeImportance = (id) => {
    let updatedNote
    const newNotes = notes.map(item => {
      if (item.id === id) {
        updatedNote = {
          ...item,
          important: !item.important
        }
        return updatedNote
      } else {
        return item
      }
    })

    updateNote(id, updatedNote)
      .then(() => {
        setNotes(newNotes)
      })
      .catch(error => {
        errorMessage({ error })
      })
  }

  const handleDelete = (id) => {
    const newNotes = notes.filter(item => item.id !== id)
    deleteNote(id)
      .then(() => {
        setNotes(newNotes)
      })
      .catch(error => {
        errorMessage({ error })
      })
  }

  return (
    <>
      <button onClick={handleLogOut}>Logout</button>

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
        : <NotesList
            notes={filteredNotes}
            onChangeImportance={handleChangeImportance}
            onDelete={handleDelete}
          />}
    </>
  )
}
