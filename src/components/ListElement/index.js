import React from 'react'
// import {PropTypes} from 'prop-types'
import './styles.css'

export default function ListElement ({ id, content, date, important, setImportant }) {
  return (
    <li className='list-item'>
      <div className='list-item__main-content'>
        {content} {important && '⭐'}
        <button onClick={() => setImportant(id)}>{important ? 'Not important' : 'Make important'}</button>
      </div>
      <small>{date}</small>
      <div className='separator' />
    </li>
  )
}

// ListElement.protoTypes = {
//
// }
