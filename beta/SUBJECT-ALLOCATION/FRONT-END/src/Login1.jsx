import React from 'react'
import "./login1.css"
import "./but.css"
import { useNavigate } from 'react-router-dom'

const Login1 = () => {
  let navigate=useNavigate();
  function handleAdminButtonClick(){
    navigate("/login/admin");
  }
  function handleTeacherButtonClick(){
    navigate("/login/teacher");
  }
  return (
    <div>
        <div className='image'></div>
        {/* <img className='logo' src='./images/rsetlogo.jpg'/> */}
        <h2 id='heading'>RAJAGIRI MANAGEMENT SYSTEM</h2>
        <button className='admbutt' onClick={handleAdminButtonClick}>Admin</button>
        <button className='teacbutt' type="button" onClick={handleTeacherButtonClick}>Teacher</button>
    </div>
  )
}

export default Login1