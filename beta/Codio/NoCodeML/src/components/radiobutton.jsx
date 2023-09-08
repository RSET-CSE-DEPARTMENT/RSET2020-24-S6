import React from 'react'

function RadioButtonGroup(props) {
  return (
    <div className='flex flex-col w-80 place-self-center p-2 rounded-lg gap-1 interior'>
      <label>
        <input type="radio" value="option1" checked={props.selectedOption === 'option1'} onChange={props.handleInputChange} />
        Upload File
      </label>
      <label>
        <input type="radio"  value="option2" checked={props.selectedOption === 'option2'} onChange={props.handleInputChange} />
        Implicit File
      </label>
    </div>
  );
}

export default RadioButtonGroup;
