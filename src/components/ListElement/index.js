import React from 'react'
// import {PropTypes} from 'prop-types'
import './styles.css'

export default function ListElement({content, date}) {
  return (
    <li className="list-item">
      <div>{content}</div>
      <small>{date}</small>
      <div className="separator" />
    </li>
  )
}

// ListElement.protoTypes = {
//
// }