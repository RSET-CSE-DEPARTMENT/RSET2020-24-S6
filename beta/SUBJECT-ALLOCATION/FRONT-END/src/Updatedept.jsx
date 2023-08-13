import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./global.css"
function Updatedept() {

     const {depid} =useParams();
     console.log(depid);

    const [editUser, setEditUser]=useState({  depid: "",depname: "",HODname: "",division: ""});

    useEffect(()=>{
          const getUser= async()=>{
               const reqData= await fetch('http://127.0.0.1:8000/home/departmentupdation/'+depid);
               const resData= reqData.json();
               setEditUser(await resData);
          }
          getUser()
    },[]);

   
  const handleSubmit = (e) => {
    const endpoint = 'http://127.0.0.1:8000/home/departmentupdation/'+depid
    e.preventDefault()
    const payload = {
        depid:editUser.depid,
        depname:editUser.depname,
        HODname:editUser.HODname,
        division:editUser.division,
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
            <Link to="/home/viewdepartment">Back</Link>
            <form className="form" onSubmit={handleSubmit}>
                    <div className="input">
                    <label className="nam">Department Id</label>
                    <input className="box" type="text" name="dept id" placeholder="dept id" value={editUser.depid} onChange={e => setEditUser({...editUser,depid: e.target.value})}/><br/>
                    <label className="nam">Department Name </label>
                    <input className="box" type="text" name="name" placeholder="name" value={editUser.depname} onChange={e => setEditUser({...editUser,depnamename: e.target.value})}/><br/>
                   
                    <label className="nam">HOD name</label>
                    <input className="box" type="text" name="Depid" placeholder="Depid" value={editUser.HODname} onChange={e => setEditUser({...editUser,HODname: e.target.value})}/><br/>
                    <label className="nam">Divisions</label>
                    <input className="box" type="text" name="Depid" placeholder="Depid" value={editUser.division} onChange={e => setEditUser({...editUser,division: e.target.value})}/><br/>
                   
                    <input className="button" type="submit" value="Submit" />
                    </div>                
                </form>
            </div>
        </div>
    )
    
}
export default Updatedept