import React from 'react'
// import {PropTypes} from 'prop-types'
import './styles.css'

export default function ListElement ({ id, content, date, important, setImportant, onDelete }) {
  return (
    <li className='list-item'>
      <div className='list-item__main-content'>
        {content} {important && '⭐'}
        <button onClick={() => setImportant(id)}>{important ? 'Not important' : 'Make important'}</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      <small>{date}</small>
      <div className='separator' />
    </li>
  )
}

// ListElement.protoTypes = {
//
// }
