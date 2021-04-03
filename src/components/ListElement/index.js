import React from 'react'
// import {PropTypes} from 'prop-types'
import './styles.css'

export default function ListElement ({ id, content, date, important, setImportant, onDelete }) {
  return (
    <li className='list-item'>
      <div className='list-item__main-section'>
        <div className='list-item__content'>
          {content} {important && '⭐'}
        </div>
        <div className='list-item__buttons'>
          <button onClick={() => setImportant(id)}>{important ? 'Not important' : 'Make important'}</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
      <small>{date}</small>
      <div className='separator' />
    </li>
  )
}

// ListElement.protoTypes = {
//
// }
