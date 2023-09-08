import React from 'react'
import RadioButtonGroup from './radiobutton';
const Input = ({setKey,selectedOption,handleInputChange,changeInputFileName,changeInputFileInteger,changeInputInbuilt,changeInputTestSize,changeInputRandomState}) => {
  
  return (
    <div className='card1 flex flex-col w-96 border-2 rounded-lg background-color1 gap-1' key={setKey}>
      <div className='heading w-96 p-2'>
      INPUT
      </div>
      
        <RadioButtonGroup selectedOption={selectedOption} handleInputChange={handleInputChange} />

    <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
    {(selectedOption==='option1')?
    (
      <div>
        <p className='self-start rounded-lg h-10'>Upload File</p>
        <input type='text' className='rounded-lg w-72' onChange={e=>changeInputFileName(setKey,e.target.value)}></input>
        <p className='self-start rounded-lg h-10'>Integer location</p>
        <input type='number' className='rounded-lg w-72' onChange={e=>changeInputFileInteger(setKey,e.target.value)}></input>
      </div>
    )
    :
    ( <div><p className='self-start'>In-built</p>
          <select name="inbuilt" id="inbuilt" className='border-1 rounded-lg h-10' onChange={e=>changeInputInbuilt(setKey,e.target.value)}>
              <option value="iris_plant">Iris Plant</option>
              <option value="diabetes_patient">Diabetes Patient</option>
              <option value="hand_written_digits">Hand Written Digits</option>
              <option value="wine_recognition">Wine Recognition</option>
              <option value="breast_cancer_recognition">Breast Cancer Recognition</option>
          </select>
          </div>
    )}
      
        <p className='self-start'>Test Size</p>
        <input type='number' className='rounded-lg' onChange={e=>changeInputTestSize(setKey,e.target.value)}></input>

        <p className='self-start'>Random State</p>
        <input type='number' className='rounded-lg' onChange={e=>changeInputRandomState(setKey,e.target.value)}></input>
      </div>
    </div>
  )
}

export default Input