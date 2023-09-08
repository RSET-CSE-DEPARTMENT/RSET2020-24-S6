import React from 'react'

const ANNInput = ({setKey,removeLayer,changeANNInputDim}) => {
  return (
    <div>
        <div className='card1 flex flex-col w-96 border-2 rounded-lg background-color1 gap-1' key={setKey}>
            <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
            ANN Input
            <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
            </div>
            <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
                <p className='self-start rounded-lg'>Input Dimension</p>
                <input type='text' className='rounded-lg' onChange={e=>changeANNInputDim(setKey,e.target.value)}></input>
            </div>
        </div>
    </div>
  )
}

export default ANNInput