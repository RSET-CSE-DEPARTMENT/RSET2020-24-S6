import React from 'react'
import './style.css'
const Linear_regression = ({setKey,removeLayer}) => {
  return (
    <div className='card1 flex flex-col w-96 h-96 border background-color-blue rounded-lg text-4xl' key={setKey}>
      <div className='heading1 w-96 p-6 flex flex-row justify-between'>
        Linear Regression
        <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
      </div>
    </div>
  )
}

export default Linear_regression