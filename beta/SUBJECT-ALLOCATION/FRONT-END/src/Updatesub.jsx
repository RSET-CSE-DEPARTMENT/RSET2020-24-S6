import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./global.css"
function Updatesub() {

     const {subid} =useParams();
     console.log(subid);
     const [dept, setDept]=useState([])
    useEffect(()=>{
        
        const getUser= async()=>{
            const reqData= await fetch('http://127.0.0.1:8000/home/department');
            const resData= reqData.json();
            setDept(await resData);
       }
       getUser()

  },[]);

    const [editUser, setEditUser]=useState({  subid: "",subname: "",sem: "",depid: "",subtype: ""});

    useEffect(()=>{
          const getUser= async()=>{
               const reqData= await fetch('http://127.0.0.1:8000/home/subjectupdation/'+subid);
               const resData= reqData.json();
               setEditUser(await resData);
          }
          getUser()
    },[]);

   
  const handleSubmit = (e) => {
    const endpoint = 'http://127.0.0.1:8000/home/subjectupdation/'+subid
    e.preventDefault()
    const payload = {
        subid:editUser.subid,
        subname:editUser.subname,
        sem:editUser.sem,
        depid:editUser.depid,
        subtype:editUser.subtype
    }
    console.log(payload)

    fetch(endpoint,
        {
            method: 'PUT',
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

    return(
        <div>
            <div className="list">
            <Link to="/home/viewsubject">Back</Link>
            <form className="form" onSubmit={handleSubmit}>
                    <div className="input">
                    <label className="nam">Course Code</label>
                    <input className="box" type="text" name="course code" placeholder="course code" value={editUser.subid} onChange={e => setEditUser({...editUser,subid: e.target.value})}/><br/>
                    <label className="nam">Course Name </label>
                    <input className="box" type="text" name="name" placeholder="Subject" value={editUser.subname} onChange={e => setEditUser({...editUser,subname: e.target.value})}/><br/>
                    <label classname="nam">Select Semister </label>
                    <select className="box" value={editUser.sem}  onChange={e => setEditUser({...editUser,sem: e.target.value})}>
                    <option value="Sem 1">Sem 1</option>
                        <option value="Sem 2">Sem 2</option>
                        <option value="Sem 3">Sem 3</option>
                        <option value="Sem 4">Sem 4</option>
                        <option value="Sem 5">Sem 5</option>
                        <option value="Sem 6">Sem 6</option>
                        <option value="Sem 7">Sem 7</option>
                        <option value="Sem 8">Sem 8</option>
                    </select><br/>
                    
                    <label className="nam">Department </label>
                    <select className="box" value={editUser.depid} onChange={e => setEditUser({...editUser,depid: e.target.value})}>
                            <option value="">Select an option</option>
                                    {dept.map((option) => (
                                    <option key={option} value={option.depid}>{option.depname} </option>
                                    ))}
                        </select><br />
                    <label>Type </label>
                    <select className="box" value={editUser.subtype}  onChange={e => setEditUser({...editUser,subtype: e.target.value})}>
                            <option value="T">Theory</option>
                            <option value="P">Practical</option>
                    </select><br/>
                    <input className="button" type="submit" value="Submit" />
                    </div>                
                </form>
            </div>
        </div>
    )
    
}
export default Updatesub