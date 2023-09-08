import React from 'react'

const RandomForest = ({setKey,choice,removeLayer,changeRandomChoice,changeRandomEstimators,changeRandomCriterion,changeRandomMinSample,changeRandomMaxFeatures}) => {


  return (
    <div className='card1 flex flex-col w-96 border-2 background-color1 gap-1' key={setKey}>
      <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
      Random Forest
      <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
      </div>
        <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
          <p className='self-start'>Choice</p>
            <select name="choice" id="choice" className='border-1 h-10' onChange={e=>changeRandomChoice(setKey,e.target.value)}>
                <option value="classifier">Classifier</option>
                <option value="regression">Regression</option>
            </select>

          <p className='self-start'>No of estimators</p>
          <input type='number' className='rounded-lg' onChange={e=>changeRandomEstimators(setKey,e.target.value)}></input>

          <p className='self-start'>Criterion</p>
          {
            (choice==='classifier')?
            (<select name="criterion" id="criterion" className='border-1 h-10' onChange={e=>changeRandomCriterion(setKey,e.target.value)}>
                <option value="'gini'">gini</option>
                <option value="'entropy'">entropy</option>
                <option value="'log_loss'">log loss</option>
            </select>):(<select name="criterion" id="criterion" className='border-1 h-10' onChange={e=>changeRandomCriterion(setKey,e.target.value)}>
                <option value="'squared_error'">squared error</option>
                <option value="'absolute_error'">absolute error</option>
                <option value="'poisson'">poisson</option>
                <option value="'friedman_mse'">Friedman MSE</option>
            </select>)
            }

          <p className='self-start'>Minimum samples split</p>
          <input type='number' className='rounded-lg' onChange={e=>changeRandomMinSample(setKey,e.target.value)}></input>

          <p className='self-start'>Maximum features</p>
          <input type='number' className='rounded-lg' onChange={e=>changeRandomMaxFeatures(setKey,e.target.value)}></input>
      </div>
    </div>
  )
}

export default RandomForest