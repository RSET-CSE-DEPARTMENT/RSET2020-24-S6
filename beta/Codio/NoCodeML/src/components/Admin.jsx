import React, { useEffect } from 'react'
import './admin.css'
import { useState} from 'react'
import axios from 'axios'
const Admin = () => {
    const [userName,setUserName]=useState('')
    const [loginCount,setLoginCount]=useState(0)
    const [codeGenerationCount,setCodeGenerationCount]=useState(0)
    const [algo,setAlgo]=useState('')
   
    useEffect(()=>{
            localStorage.setItem("algo", JSON.stringify(algo));
          }, [algo]);

    useEffect(()=>{
            //count Generation count from the backend
            axios.defaults.withCredentials = true //since no ssl..
            const response= axios.post('http://localhost:8080/admin', )
                  .then((response) => {
                  setCodeGenerationCount(response.data);
                })
          }, [codeGenerationCount]);
    useEffect(()=>{
            //login count from the backend
            axios.defaults.withCredentials = true //since no ssl..
            const response= axios.post('http://localhost:8080/admin2', )
                  .then((response) => {
                  setLoginCount(response.data);
                })
          }, [loginCount]);
    useEffect(()=>{
            //username 
            const user=localStorage.getItem("username");
            console.log("usern:"+ user)
            setUserName(user);
          }, [userName]);
    function handleAlgo(e)
    {
        setAlgo(e.target.value)
        window.open("/changeInfo",'_self');

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
                <button className='side-strip-button-active rounded-3xl'>Dashboard</button>
            </div>
            <div class="vl"></div>
            <div className='flex flex-row main-area'>
                <div className='flex flex-col m-20 h-fit '>
                    <div className='flex flex-row '>
                        <h2 className='heading-2'>UPDATE</h2>
                    </div>
                    <div className='flex flex-col infoarea shadow-md shadow-gray-400'>
                        <button className='button-1' value='Linear Regression' onClick={handleAlgo}>Linear Regression</button>
                        <button className='button-2' value='Logistic Regression' onClick={handleAlgo}>Logistic Regression</button>
                        <button className='button-1' value='Decision Tree' onClick={handleAlgo}>Decision Tree</button>
                        <button className='button-2' value='Random Forest' onClick={handleAlgo}>Random Forest</button>
                        <button className='button-1' value='KNN' onClick={handleAlgo}>KNN</button>
                        <button className='button-2' value='K-Means' onClick={handleAlgo}>K-Means</button>
                        <button className='button-1' value='SVM' onClick={handleAlgo}>SVM</button>
                        <button className='button-2' value='Naive Bayes' onClick={handleAlgo}>Naive Bayes</button>
                        <button className='button-1' value='ANN' onClick={handleAlgo}>ANN</button>
                    </div>    
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col mx-20 h-fit '>
                        <div className='flex flex-row '>
                            <h2 className='heading-2'>SIGHTINGS</h2>
                        </div>
                        <div className='flex flex-col infoarea shadow-md shadow-gray-400'>
                            <div className='counts m-8'>
                                User Count
                                <div className='bg-white w-24 rounded-md text-black text-center'>
                                    {loginCount}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mx-20 my-4 h-fit '>
                        <div className='flex flex-row '>
                            <h2 className='heading-2'>SIGHTINGS</h2>
                        </div>
                        <div className='flex flex-col infoarea shadow-md shadow-gray-400'>
                            <div className='counts m-8 text-center'>
                                Code Generation
                                <br/>
                                Count
                                <div className='bg-white w-24 rounded-md text-black text-center'>
                                    {codeGenerationCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin