import React from 'react'
import NewComp from './new_comp.jsx'
import InfoButton from './InfoButton.jsx'
const main_area = () => {
  return (
    <div>
      
      <InfoButton/>
      
    <div className='flex flex-col'>
        <NewComp/>
    </div>
    
    </div>
  )
}

export default main_area
