import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import './styles.css'

const emptyNote = {
  content: ''
}

export default function NewNote ({ createNewNote = () => {} }) {
  const [newNote, setNewNote] = useState(emptyNote)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleOnChange = (ev) => {
    setNewNote({
      ...newNote,
      content: ev.target.value
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setShowEmojiPicker(false)
    createNewNote(newNote)
    setNewNote(emptyNote)
  }

  const onEmojiClick = (_, emojiObject) => {
    setNewNote({
      content: newNote.content + emojiObject.emoji
    })
  }

  return (
    <form onSubmit={handleSubmit} className='newnote-form'>
      <input onChange={handleOnChange} name='note' type='text' placeholder='Type new note here' value={newNote.content || ''} />
      <input type='button' onClick={() => setShowEmojiPicker(!showEmojiPicker)} value='🙂' />
      <button>Create</button>
      {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
    </form>
  )
}
