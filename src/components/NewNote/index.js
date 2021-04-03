import React, { useState, useRef } from 'react'
import Picker from 'emoji-picker-react'

import './styles.css'

const emptyNote = {
  content: ''
}

export default function NewNote ({ createNewNote = () => {} }) {
  const [newNote, setNewNote] = useState(emptyNote)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  // const [loadingEmojiPicker, setLoadingEmojiPicker] = useState(false)

  const createButton = useRef()

  const handleOnChange = (ev) => {
    setNewNote({
      ...newNote,
      content: ev.target.value
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    createButton.current.disabled = true
    setShowEmojiPicker(false)
    createNewNote(newNote)
      .then(() => {
        createButton.current.disabled = false
        setNewNote(emptyNote)
      })
      .catch(error => console.log(error))
  }

  const onEmojiClick = (_, emojiObject) => {
    setNewNote({
      content: newNote.content + emojiObject.emoji
    })
  }

  const handleShowEmojiPicker = () => {
    // setLoadingEmojiPicker(true)
    setShowEmojiPicker(!showEmojiPicker)
    // setLoadingEmojiPicker(false)
  }

  return (
    <form onSubmit={handleSubmit} className='newnote-form'>
      <input onChange={handleOnChange} name='note' type='text' placeholder='Type a new note here' value={newNote.content || ''} />
      <input type='button' onClick={handleShowEmojiPicker} value='🙂' />
      <button ref={createButton}>Create</button>
      {/* {loadingEmojiPicker && <div>Loading...</div>} */}
      {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
    </form>
  )
}
