import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function TLogin(){
    const [values, setValues] =useState({Tid: '',password: ''});
 const navigate=useNavigate();
 
 const submitForm = (e)=> {
    e.preventDefault();
    
    const endpoint = 'http://127.0.0.1:8000/home/teacherlogin'
         e.preventDefault()
         const payload = {
            Tid: values.Tid,
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
                    const tid=values.Tid;
                  navigate('/teacher/'+tid);
                
                }
                else{
                    alert("Please check your login")
                }
            
             })

          
    
}
    return(
        <div className='back'>
            <div className="image"></div>
            <div className="box1">
            <h2>Login</h2>
            <form  onSubmit={submitForm}>
            <label >Teacher Id</label>
            <input className='' type="text" placeholder="teacher Id"  value={values.Tid} onChange={e => setValues({...values,Tid: e.target.value})}></input>
           
            <label >Password: </label>
            <input className=''  type="password" placeholder="Password"  value={values.password} onChange={e => setValues({...values,password: e.target.value})}></input>
           
            <button className='submit'>Login</button> 
        
        </form>
        </div> </div> 
    );

}
export default TLogin