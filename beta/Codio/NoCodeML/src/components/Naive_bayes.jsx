import React from 'react'
const Naive_bayes = ({setKey,removeLayer,changeNaiveBayesEstimator}) => {
  return (
    <div className='card1 flex flex-col w-96 h-96 border-2 background-color1 gap-1' key={setKey}>
      <div className='heading1 w-96 flex flex-row justify-between background-color-blue p-2'>
        Naive Bayes
        <button className='text-2xl delete' onClick={e => removeLayer(setKey)}>X</button>
        </div>
        <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
          <p className='self-start'>Estimator</p>
          
          <select name="estimator" id="estimator" className='border-1 h-10' onChange={e=>changeNaiveBayesEstimator(setKey,e.target.value)}>
              <option value="BernoulliNB">BernoulliNB</option>
              <option value="GaussianNB">GaussianNB</option>
              <option value="ComplementNB">ComplementNB</option>
              <option value="MultinomialNB">MultinomialNB</option>

          </select>
        </div>
    </div>
  )
}
export default Naive_bayes