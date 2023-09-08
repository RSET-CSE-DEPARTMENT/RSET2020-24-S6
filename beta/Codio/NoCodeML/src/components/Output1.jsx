import { useState } from "react"
import CodeSection from './CodeSection'

const Output1 = ({setKey}) => {
   
    return (
      <div className='flex flex-col w-96 border-2 background-color1 gap-1' key={setKey}>
        <div className='background-color-blue p-2'>
          OUTPUT
        </div>
      </div>
    )
  }
  
  export default Output1