import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Update() {

     const {tid} =useParams();
     console.log(tid);
     const [dept, setDept]=useState([])
     useEffect(()=>{
         
         const getUser= async()=>{
             const reqData= await fetch('http://127.0.0.1:8000/home/department');
             const resData= reqData.json();
             setDept(await resData);
        }
        getUser()
 
   },[]);

    const [editUser, setEditUser]=useState({ tname: "",tmail: "",gender: "",tid: "",pos:"",password: "",year: "",depid: ""});

    useEffect(()=>{
          const getUser= async()=>{
               const reqData= await fetch('http://127.0.0.1:8000/home/teacherupdation/'+tid);
               const resData= reqData.json();
               setEditUser(await resData);
          }
          getUser()
    },[]);

   
  const handleSubmit = (e) => {
    const endpoint = 'http://127.0.0.1:8000/home/teacherupdation/'+tid
    e.preventDefault()
    const payload = {
        tname:editUser.tname,
        tmail:editUser.tmail,
        depid:editUser.depid,
        gender:editUser.gender,
        tid:editUser.tid,
        pos:editUser.pos,
        password:editUser.password,
        year:editUser.year
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
            <Link  className="b" to="/home/viewteacher">Back</Link>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input">
                    <label className="nam">Name </label>    
                    <input className="box" type="text" name="name" placeholder="Name" value={editUser.tname} onChange={e => setEditUser({...editUser,tname: e.target.value})} /><br/>
                    <label className="nam">E-mail </label>
                    <input className="box" type="text" name="Email" placeholder="Email" value={editUser.tmail}  onChange={e => setEditUser({...editUser,tmail: e.target.value})}/><br/>
                    
                    <label>Gender </label>
                    <select className="box" value={editUser.gender}  onChange={e => setEditUser({...editUser,gender: e.target.value})}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select><br/>
                    <label className="nam">Id </label>
                    <input className="box" type="text" name="Teacher ID" placeholder="Teacher Id"  value={editUser.tid}/><br/>

                    <label>Designation </label>
                    <select className="box" value={editUser.pos}  onChange={e => setEditUser({...editUser,pos: e.target.value})}>
                            <option value="2">Proffessor</option>
                            <option value="1">Asso.Proffesor</option>
                            <option value="0">Asst. proffesor</option>
                    </select><br/>
                    <label className="nam">Date Of Joining </label>
                    <input className="box" type="date" year="doj" placeholder="Date of Joining" value={editUser.year} onChange={e => setEditUser({...editUser,year: e.target.value})}/><br/>
                    <label className="nam">Department </label>
                    <select className="box" value={editUser.depid} onChange={e => setEditUser({...editUser,depid: e.target.value})}>
                            <option value="">Select an option</option>
                                    {dept.map((option) => (
                                    <option key={option} value={option.depid}>{option.depname} </option>
                                    ))}
                        </select><br />
                    
                    <input className="button" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
    return(
    <div>update</div>)
}
export default Update