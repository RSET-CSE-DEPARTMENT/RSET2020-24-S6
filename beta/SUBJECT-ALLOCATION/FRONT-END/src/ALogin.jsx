import React, { Component } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Vallog from './vallog';
import "./login.css"
import App from './App';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
function ALogin(){

 const [values, setValues] =useState({aid: '',password: ''});
 const [errors, setErrors] = useState({});
 
 const navigate=useNavigate()
 
 const submitForm = (e)=> {
    e.preventDefault();
    setErrors(Vallog(values));
    const endpoint = 'http://127.0.0.1:8000/home/adminlogin/'
         e.preventDefault()
         const payload = {
            aid: values.aid,
            password: values.password
         }
         console.log(payload)

         fetch(endpoint,
             {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(payload)
             })
             .then(response => response.json())
             .then(data => {
                if(data==="SUCCESS")
                {
                    const id=values.aid
                //    window.open('/home','_self');
                     navigate("/home");
                }
                else{
                    alert("Please check your login")
                }
             })

          
    
}
    return(
        <div className='back' >
             <div className='image'></div>
             <div className='box1'>
            <h2>Login</h2>
            <form  onSubmit={submitForm}>
            <label >Admin Id</label>
            <input className='' type="text" placeholder="Admin Id"  value={values.aid} onChange={e => setValues({...values,aid: e.target.value})}></input>
            {errors.aid && <p style={{color: "red", fontSize: "9"}}>{errors.aid}</p>}
            <label >Password: </label>
            <input className=''  type="password" placeholder="Password"  value={values.password} onChange={e => setValues({...values,password: e.target.value})}></input>
            {errors.password && <p style={{color: "red", fontSize: "9"}}>{errors.password}</p>}
            <button className='submit'>Login</button> 
        
        </form>
        </div>  </div>
    );
}

export default ALogin;