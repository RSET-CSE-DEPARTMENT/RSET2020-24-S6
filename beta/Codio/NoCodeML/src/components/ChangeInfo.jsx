import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
const ChangeInfo = () => {
const [algo, setAlgo] = useState();
const [userName,setUserName]=useState('');
const [info,setInfo]=useState('')
const ref = useRef(null);
useEffect(() => {
  const algos = JSON.parse(localStorage.getItem('algo'));
  setAlgo(algos)
  setInfo('Trial info')
}, []);
useEffect(()=>{
    axios.defaults.withCredentials = true 
    const response= axios.post('http://localhost:8080/admin3', {
      data : {
          algorithm:algo
      }})
      .then((response) => {
        //   console.log(response.data.details);
           setInfo(response.data.details.S)
        })
}, [algo]);
function updateInfo()
{
    console.log(ref.current.value)
    axios.defaults.withCredentials = true 
    const response= axios.post('http://localhost:8080/admin4', {
      data : {
          algorithm:algo,
          details:ref.current.value
      }})     
   window.open("/admin",'_self');
}
function dashboard()
    {
        window.open("/admin",'_self');
    }
    function back()
    {
        window.open("/login",'_self');
    }
  return (
    <div className='flex flex-col'>
        <div className='header'>
            <h1 className='heading2'>codeio</h1>
            <h2 className='heading-right'>{userName}</h2>
        </div>
        <div className='flex flex-row'>
            <div className='flex flex-col side-strip'>
                <button className='side-strip-button rounded-3xl' onClick={back}>Back</button>
                <button className='side-strip-button rounded-3xl' onClick={dashboard}>Dashboard</button>
                <button className='side-strip-button-active rounded-3xl'>Change Info</button>
            </div>
            <div class="vl"></div>
            <div className='flex flex-col main-area'>
                <h2 className='m-10'>{algo}</h2>
                <textarea className='infoarea2' ref={ref} defaultValue={info}></textarea>
                <button className='button-2 w-36' onClick={updateInfo}>Update</button>
            </div>
        </div>
    </div>
  )
}
export default ChangeInfo