import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import App from './App'
const Sub = () => {

let navigate=useNavigate();
  function handleSubDetailsClick() {
    navigate("/home/viewsubject");
    
  }

function handleSubAllocationClick(){
  navigate("/home/sub/phase");
}

  return (
    <div>
        <App/>
        <h1 className="dash">SUBJECT </h1>
            <br/>
            <button className='outline1' onClick={handleSubDetailsClick}>Subject Details</button>
            <button className='outline2' onClick={handleSubAllocationClick}>Subject Allocation</button>
        
        
    </div>
  )
}

export default Sub