import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function Progress(){
 
const {id} =useParams();
const navigate=useNavigate();

const [phase, setPhase]=useState([]);
const [depsel, setDepsel]=useState([]);
const [tea, setTea]=useState([]);
const [temclass, setTemclass]=useState([]);
const [subsel, setSubsel]=useState([]);

useEffect(()=>{//fetching required datas from API
  const getUser= async()=>{
       const reqData= await fetch('http://127.0.0.1:8000/home/phaseview');
       const resData= reqData.json();
       setPhase(await resData);
  }
  getUser()

 const fetchtea = () =>{
  fetch('http://127.0.0.1:8000/home/viewteacher/')
      .then((response) => response.json())
      .then(data => setTea(data))
}
fetchtea()


const fetchsub = () =>{
fetch('http://127.0.0.1:8000/home/subject/')
    .then((response) => response.json())
    .then(data => setSubsel(data))
}
fetchsub()
const fetchdept = () =>{
  fetch('http://127.0.0.1:8000/home/department')
      .then((response) => response.json())
      .then(data => setDepsel(data))
}
fetchdept()

const fetchclass = () =>{
  fetch('http://127.0.0.1:8000/home/teacherlogin/division')
      .then((response) => response.json())
      .then(data => setTemclass(data))
}
fetchclass()

},[]);

console.log(temclass)

const classtab1 = temclass.map(item1 => {
  const matchingItem = subsel.find(item2 => item2.subid === item1.subject);
  return { ...item1, ...matchingItem };
  });

  const classtab2 = classtab1.map(item1 => {
    const matchingItem = depsel.find(item2 => item2.depid === item1.depid);
    return { ...item1, ...matchingItem };
    });
  console.log(classtab2) 

  

  const opt = phase.map((dictionary) => {
    return { ...dictionary, subname1: "",subname2: "",subname3: "",subname4: "",subname5: "",subname6: "",classname1: "",classname2: "",classname3: "",classname4: "",classname5: "",classname6: "",tname: "" };
  });


  


console.log(opt)

for(let i=0;i< opt.length; i++)
 {
   for(let j=0; j<tea.length; j++)
   {
    if(opt[i].tid===tea[j].tid)
    {
      opt[i].tname=tea[j].tname;
    }
   }
   for( let k=0; k<classtab2.length; k++)
   {
    if(opt[i].sub1===classtab2[k].classid)
    {
      opt[i].subname1=classtab2[k].subname;
      opt[i].classname1=classtab2[k].classname;
    }
    if(opt[i].sub2===classtab2[k].classid)
    {
      opt[i].subname2=classtab2[k].subname;
      opt[i].classname2=classtab2[k].classname;
    }
    if(opt[i].sub3===classtab2[k].classid)
    {
      opt[i].subname3=classtab2[k].subname;
      opt[i].classname3=classtab2[k].classname;
    }
    if(opt[i].sub4===classtab2[k].classid)
    {
      opt[i].subname4=classtab2[k].subname;
      opt[i].classname4=classtab2[k].classname;
    }
    if(opt[i].sub5===classtab2[k].classid)
    {
      opt[i].subname5=classtab2[k].subname;
      opt[i].classname5=classtab2[k].classname;
    }
    if(opt[i].sub6===classtab2[k].classid)
    {
      opt[i].subname6=classtab2[k].subname;
      opt[i].classname6=classtab2[k].classname;
    }

   }
 }

const handleclick =(e) =>{
    navigate("/teacher/"+id)
}

console.log(opt);


return(
<div> 
  <div>
    <button className="adddeptbutt" onClick={handleclick}>Back</button>
  </div>
  <div>
  <table className='view-dep-container'>
      <thead>
        <tr className='header'>
          <th>Name</th>
          <th>Course</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        {opt.map((item) => (
          <tr key={item.id}>
            <td>{item.tname}</td>
            <td>{item.subname1 }<br/>
            {item.subname2 }<br/>
            {item.subname3 }<br/>
            {item.subname4 }<br/>
            {item.subname5 }<br/>
            {item.subname6 }
            
            </td>
            <td>{item.classname1}<br/>
            {item.classname2}<br/>
            {item.classname3}<br/>
            {item.classname4}<br/>
            {item.classname5}<br/>
            {item.classname6}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div> 

 </div> 

)


}

export default Progress