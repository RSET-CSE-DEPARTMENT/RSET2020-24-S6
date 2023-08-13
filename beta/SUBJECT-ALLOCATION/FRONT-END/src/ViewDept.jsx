import React from 'react'
import App from './App'
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import "./optionstyle.css"
import "./App.css"
function ViewDept(){  
    const [records, setRecords] = useState([]);

    const fetchData = () =>{
        fetch('http://127.0.0.1:8000/home/department')
            .then((response) => response.json())
            .then(data => setRecords(data))
    }
  
    React.useEffect(() =>{
      fetchData();
    }, []);

    let navigate=useNavigate();
    function handleAddDeptClick(){
      navigate("/home/department");
    }
  
 return(
    <div>
      <App />
      <h1 className="dash">DEPARTMENT  </h1>
            <br/>
      <button className='adddeptbutt' onClick={handleAddDeptClick}>Add Department</button>



        <table className='view-dep-container'>
                <tr className="header">
                    <th>Department Id</th>
                    <th>Name</th>
                    <th>HOD Name</th>
                    <th>Divisions</th>
                    <th>Action</th>
                    {/* <th>Action</th> */}
                </tr>
            <tbody>
            { records.map(datas=>
                  {
                  return <tr className="body">
                    <td>{datas.depid} </td>
                    <td>{datas.depname}</td>
                    <td>{datas.HODname}</td>
                    <td>{datas.division}</td>
                    <td>
                    <button><Link to={`/updatedept/${datas.depid}`} className="updatebutt">Update</Link></button>
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
export default ViewDept;