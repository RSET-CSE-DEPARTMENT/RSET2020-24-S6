import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./global.css"
import { Link } from "react-router-dom";
function Adddept(){
   
    const [addUser, setAddUser]=useState({  depid: "",depname: "",HODname: "",division: ""});
    const [errors,setErrors]=useState({})

   const handleSubmit=(e)=>{
        const endpoint = 'http://127.0.0.1:8000/home/department'
        e.preventDefault()
        // setErrors(Valsub(addUser));
        const payload = {
            depid:addUser.depid,
            depname:addUser.depname,
            HODname:addUser.HODname,
            division:addUser.division,
           
        }

        
        

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


        return(
            <div className="list">
                <Link to="/home/viewdepartment">back</Link>
                <form className="form" onSubmit={handleSubmit} >
                    <div className="input">
                    {/* {errors.subid && <p style={{color: "red", fontSize: "7"}}>{errors.subid}</p>} */}

                    <label className="nam">Department Id</label>
                    <input className="box" type="text" name="Id" placeholder="Id" value={addUser.depid} onChange={e => setAddUser({...addUser,depid: e.target.value})}/><br/>
                    {/* {errors.subname && <p style={{color: "red", fontSize: "7"}}>{errors.subname}</p>} */}

                    <label className="nam">Department Name </label>
                    <input className="box" type="text" name="name" placeholder="Name" value={addUser.depname} onChange={e => setAddUser({...addUser,depname: e.target.value})}/><br/>
                    
                    
                    {/* {errors.depid && <p style={{color: "red", fontSize: "7"}}>{errors.depid}</p>} */}

                    <label className="nam">HOD Name </label>
                    <input className="box" type="text" name="Name" placeholder="Name" value={addUser.HODname} onChange={e => setAddUser({...addUser,HODname: e.target.value})}/><br/>
                   
                    <label className="nam">Divisions </label>
                    <input className="box" type="text" name="Divisions" placeholder="Divisions" value={addUser.division} onChange={e => setAddUser({...addUser,division: e.target.value})}/><br/>

                    <input className="button" type="submit" value="Submit" />
                    </div>                
                </form>
            </div>
        )
}
export default Adddept;