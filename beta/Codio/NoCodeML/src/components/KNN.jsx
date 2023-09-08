import React from 'react'

const KNN = ({setKey,removeLayer,changeKNNAlgorithm,changeKNNChoice,changeKNNNumber,changeKNNWeights}) => {


  return (
    <div className='card1 flex flex-col w-96 border-2 background-color1 gap-1' key={setKey}>
      <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
      KNN
      <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
      </div>
      <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
        <p className='self-start'>Choice</p>
          <select name="choice" id="choice" className='border-1 rounded-lg h-10' onChange={e=>changeKNNChoice(setKey,e.target.value)}>
              <option value="classifier">Classifier</option>
              <option value="regression">Regression</option>
          </select>

        <p className='self-start'>N-neighbour</p>
        <input type='number' className='rounded-lg' onChange={e=>changeKNNNumber(setKey,e.target.value)}></input>

        <p className='self-start'>Algorithm</p>
          <select name="algorithm" id="algorithm" className='border-1 rounded-lg h-10' onChange={e=>changeKNNAlgorithm(setKey,e.target.value)}>
              <option value="'auto'">auto</option>
              <option value="'ball_tree'">ball_tree</option>
              <option value="'kd_tree'">kd_tree</option>
              <option value="'brute'">brute</option>
          </select>

        <p className='self-start'>Weights</p>
          <select name="weights" id="weights" className='border-1 rounded-lg h-10' onChange={e=>changeKNNWeights(setKey,e.target.value)}>
              <option value="'uniform'">uniform</option>
              <option value="'distance'">distance</option>
          </select>
      </div>
    </div>
  )
}

export default KNN