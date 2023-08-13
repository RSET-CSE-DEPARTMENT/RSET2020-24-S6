import { useEffect, useState } from "react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./table.css"
import App from "./App";
function ViewSubject(){  
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
        fetch('http://127.0.0.1:8000/home/subject/')
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

    let navigate=useNavigate();
    function handleAddSubjectClick(){
      navigate("/home/subject");
    }
  
 return(
    <div>
      <App />
        <button className="adddeptbutt" onClick={handleAddSubjectClick}>Add Course</button>


        <table className="view-sub-container">
                <tr className="header">
                    <th>Course Code</th>
                    <th>Name</th>
                    <th>Sem</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            <tbody>
            { records.map(datas=>
                  {
                  return <tr className="body">
                    <td>{datas.subid} </td>
                    <td>{datas.subname}</td>
                    <td>{datas.sem}</td>
                    <td>{datas.depname}</td>
                    <td>{datas.subtype==="T"?"Theory":(datas.subtype=="P"?"Practicals":(datas.subtype=="E"?"Elective":(datas.subtype=="M"?"Minor":"Honours")))}</td>
                    <td>
                    <button><Link to={`/updatesub/${datas.subid}`} className="updatebutt">Update</Link></button>
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
export default ViewSubject;