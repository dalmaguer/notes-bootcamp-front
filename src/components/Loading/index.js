import React from 'react'
import ThreeDots from './ThreeDots'

import './styles.css'

export default function Loading () {
  return (
    <div className='loading-container'>
      <ThreeDots fill='grey' />
    </div>
  )
}
