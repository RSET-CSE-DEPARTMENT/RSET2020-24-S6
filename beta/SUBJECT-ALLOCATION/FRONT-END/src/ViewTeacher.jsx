import { useEffect, useState } from "react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./table.css"
import App from "./App";
import "./optionstyle.css"
function ViewTeacher(){  

  const [trecords, setTRecords] = useState([]);
    const [dept, setDept]=useState([])
    useEffect(()=>{
        
        const getUser= async()=>{
            const reqData= await fetch('http://127.0.0.1:8000/home/department');
            const resData= reqData.json();
            setDept(await resData);
       }
       getUser()

  },[]);

  const fetchData = () =>{
      fetch('http://127.0.0.1:8000/home/viewteacher/')
          .then((response) => response.json())
          .then(data => setTRecords(data))
  }

  useEffect(() =>{
    fetchData();
  }, []);

  const records = trecords.map(item1 => {
    const matchingItem = dept.find(item2 => item2.depid === item1.depid);
    return { ...item1, ...matchingItem };
    });

const handleDelete=(tid)=>{
  const endpoint = 'http://127.0.0.1:8000/home/teacherdeletion/'+tid
fetch(endpoint,
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

let navigate=useNavigate();
    function handleAddTeachClick(){
      navigate("/home/addstaff");
    }
  


 return (

    <div>
      <App />
      <h1 className="dash">TEACHER </h1>
            <br/>
        <button className="adddeptbutt" onClick={handleAddTeachClick}>Add new Teacher</button>


        <table className="view-teach-container">
                <tr className="header">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Id</th>
                    <th>Designation</th>
                    <th>Date Of Joining</th>
                    <th>Dept Id</th>
                    <th>Action</th>
                </tr>
            <tbody>
            { records.map(datas=>
                  {
                  return <tr className="body">
                    <td>{datas.tname} </td>
                    <td>{datas.tmail}</td>
                    <td>{datas.gender}</td>
                    <td>{datas.tid}</td>
                    <td>{datas.pos=="0"?"Asst proff":(datas.pos=="1"?"Asso proff":"Proff")}</td>
                    <td>{datas.year}</td>
                    <td>{datas.depname}</td>
                    <td>
                    <button> <Link to={`/update/${datas.tid}`} className="updatebutt">Update</Link></button>
                      <button><Link onClick={()=>handleDelete(datas.tid)} className="deletebutt">Delete</Link></button>
                    </td>
                  </tr>
                  }
                  )
                }
            </tbody>
        </table>
    </div>

 );


} 
export default ViewTeacher;