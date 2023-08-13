import React, { Component } from "react";
import "./global.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import Valstaff from "./Valstaff";
import { useEffect } from "react";
function Addstaff (){

    const [addUser, setAddUser]=useState({  tname: "",tmail: "",gender: "Male",tid: "",pos:"0",password: "",year: "",depid: ""});
    const [errors,setErrors]=useState({})
    const [dept, setDept]=useState([])
    useEffect(()=>{
        
        const getUser= async()=>{
            const reqData= await fetch('http://127.0.0.1:8000/home/department');
            const resData= reqData.json();
            setDept(await resData);
       }
       getUser()

  },[]);
    
    const handleSubmit=(e)=>{
         const endpoint = 'http://127.0.0.1:8000/home/viewteacher/'
         e.preventDefault()
         setErrors(Valstaff(addUser));
         const payload = {
             tname:addUser.tname,
             tmail:addUser.tmail,
             depid:addUser.depid,
             gender:addUser.gender,
             tid:addUser.tid,
             password:addUser.password,
             year:addUser.year,
             pos:addUser.pos
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
                 console.log(data)
             })


      } 

    
        return (
            <div className="list">
                <Link to="/home/viewteacher">back</Link>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input">
                    {errors.tname && <p style={{color: "red", fontSize: "9"}}>{errors.tname}</p>}

                        <label className="nam">Name </label>
                        <input className="box" type="text" name="name" placeholder="Name" value={addUser.tname} onChange={e => setAddUser({...addUser,tname: e.target.value})} /><br />
                        {errors.tmail && <p style={{color: "red", fontSize: "9"}}>{errors.tmail}</p>}
                        <label className="nam">E-mail </label>
                        <input className="box" type="text" name="Email" placeholder="Email" value={addUser.tmail} onChange={e => setAddUser({...addUser,tmail: e.target.value})} /><br />
                        
                        <label>Gender </label>
                        <select className="box" value={addUser.gender} onChange={e => setAddUser({...addUser,gender: e.target.value})} id="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select><br />
                        {errors.tid && <p style={{color: "red", fontSize: "9"}}>{errors.tid}</p>}
                        <label className="nam">Id </label>
                        <input className="box" type="text" name="Teacher ID" placeholder="Teacher Id"value={addUser.tid} onChange={e => setAddUser({...addUser,tid: e.target.value})} /><br />
                        {errors.password && <p style={{color: "red", fontSize: "9"}}>{errors.password}</p>}
                        <label className="nam">Password </label>
                        <input className="box" type="text" name="Passowrd" placeholder="Password" value={addUser.password} onChange={e => setAddUser({...addUser,password: e.target.value})} /><br />
                        
                        <label className="nam">Date Of Joining </label>
                        <input className="box" type="date" year="doj" placeholder="Date of Joining"value={addUser.year} onChange={e => setAddUser({...addUser,year: e.target.value})} /><br />
                        {errors.depid && <p style={{color: "red", fontSize: "9"}}>{errors.depid}</p>}
                        <label className="nam">Department </label>
                        <select className="box" value={addUser.depid} onChange={e => setAddUser({...addUser,depid: e.target.value})}>
                            <option value="">Select an option</option>
                                    {dept.map((option) => (
                                    <option key={option} value={option.depid}>{option.depname} </option>
                                    ))}
                        </select><br />
                        
                        <label>Designation </label>
                        <select className="box" value={addUser.pos} onChange={e => setAddUser({...addUser,pos: e.target.value})}id="pos">
                            <option value="2">Proffessor</option>
                            <option value="1">Asso.Proffesor</option>
                            <option value="0">Asst. proffesor</option>
                        </select><br />
                        <input className="button" type="submit" value="Submit"  />
                    </div>
                </form>
            </div>
        )
    

}
export default Addstaff;