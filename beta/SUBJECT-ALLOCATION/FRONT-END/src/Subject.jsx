import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./global.css"
import { Link } from "react-router-dom";
import Valsub from "./Valsub";
import Split from "./Split";
import Othersplit from "./Othersplit";
function Subject(){
   
    const [addUser, setAddUser]=useState({  subid: "",subname: "",sem: "",depid: "D0001",subtype: "T",count: ""});
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
        const endpoint = 'http://127.0.0.1:8000/home/subject/'
        e.preventDefault()
        setErrors(Valsub(addUser));
        const payload = {
            subid:addUser.subid,
            subname:addUser.subname,
            sem:addUser.sem,
            depid:addUser.depid,
            subtype:addUser.subtype
        }

        
        const pay1 = {
            subid:addUser.subid,
            subname:addUser.subname,
            sem:addUser.sem,
            depid:addUser.depid,
            subtype:addUser.subtype
        }

        let c=parseInt(addUser.count);
        const pay2 = {
        subid:addUser.subid,
        subname:addUser.subname,
        sem:addUser.sem,
        depid:addUser.depid,
        subtype:addUser.subtype,
        count:c
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
                if(data.subtype==="T" || data.subtype==="P")
                {
                    Split(pay1);
                }
                else{
                    Othersplit(pay2);
                }
                

            })    
      } 




        return(
            <div className="list">
                <Link to="/home/viewsubject">back</Link>
                <form className="form" onSubmit={handleSubmit} >
                    <div className="input">
                        <div>
                    {errors.subid && <p style={{color: "red", fontSize: "7"}}>{errors.subid}</p>}

                    <label className="nam">Course code</label>
                    <input className="box" type="text" name="Subject Id" placeholder="Subject Id" value={addUser.subid} onChange={e => setAddUser({...addUser,subid: e.target.value})}/><br/>
                    {errors.subname && <p style={{color: "red", fontSize: "7"}}>{errors.subname}</p>}

                    <label className="nam">Course Name </label>
                    <input className="box" type="text" name="name" placeholder="Subject" value={addUser.subname} onChange={e => setAddUser({...addUser,subname: e.target.value})}/><br/>
                    <label classname="nam">Select Semister </label>
                    <select classname="box" value={addUser.sem} onChange={e => setAddUser({...addUser,sem: e.target.value})} id="sem">
                        <option value="Sem 1">Sem 1</option>
                        <option value="Sem 2">Sem 2</option>
                        <option value="Sem 3">Sem 3</option>
                        <option value="Sem 4">Sem 4</option>
                        <option value="Sem 5">Sem 5</option>
                        <option value="Sem 6">Sem 6</option>
                        <option value="Sem 7">Sem 7</option>
                        <option value="Sem 8">Sem 8</option>
                    </select><br/>
                    <label className="box"/>
                    {errors.depid && <p style={{color: "red", fontSize: "7"}}>{errors.depid}</p>}

                    <label className="nam">Department</label>
                        <select className="box" value={addUser.depid} onChange={e => setAddUser({...addUser,depid: e.target.value})}>
                            <option value="">Select an option</option>
                                    {dept.map((option) => (
                                    <option key={option} value={option.depid}>{option.depname} </option>
                                    ))}
                        </select><br />
                    <label>Type </label>
                    <select className="box" value={addUser.subtype}  onChange={e => setAddUser({...addUser,subtype: e.target.value})}>
                            <option value="T">Theory</option>
                            <option value="P">Practical</option>
                            <option value="E">Elective</option>
                            <option value="M">Minor</option>
                            <option value="H">Honour</option>
                    </select><br/>
                    </div>
                    <div>
                    <label className="nam">Count</label>
                    <input className="box" type="number" name="count" placeholder="count" disabled={addUser.subtype==="T" || addUser.subtype==="P" } min="1" value={addUser.count} onChange={e => setAddUser({...addUser,count: e.target.value})} /><br/>
                    </div>
                    <input className="button" type="submit" value="Submit" />
                    </div>                
                </form>
            </div>
        )
    


}
export default Subject;