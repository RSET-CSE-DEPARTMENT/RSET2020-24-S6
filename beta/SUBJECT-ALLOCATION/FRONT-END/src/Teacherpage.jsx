
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Prog from './prog';
import "./teacherstyle.css"
function Teacherpage () {

    const {id} =useParams();//obtain id of the logged in teacher
    console.log(id);

    const [editUser, setEditUser]=useState({ tname: "",tmail: "",gender: "",tid: "",pos:"",password: "",year: "",depid: ""});//store logged in teacher info
    const [phase, setPhase]=useState({});//store phaseview
    const [view, setView]=useState([]);//subject selected
     const [temclass, setTemclass]=useState([]);
     const [semtype, setSemtype]=useState([]);
    const [subsel, setSubsel]=useState([]);
    const [depsel, setDepsel]=useState([]);
    const [final, setFinal]=useState([]);
    const [tea, setTea]=useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
  
    useEffect(()=>{//fetching required datas from API
          const getUser= async()=>{
               const reqData= await fetch('http://127.0.0.1:8000/home/teacherupdation/'+id);
               const resData= reqData.json();
               setEditUser(await resData);
          }
          getUser()

          const fetchStat = () =>{
            fetch('http://127.0.0.1:8000/home/phaseview')
                .then((response) => response.json())
                .then(data => setPhase(data))
        }
         fetchStat()

         const fetchtea = () =>{
          fetch('http://127.0.0.1:8000/home/viewteacher/')
              .then((response) => response.json())
              .then(data => setTea(data))
      }
       fetchtea()

         const fetchtype = () =>{
          fetch('http://127.0.0.1:8000/home/semtype')
              .then((response) => response.json())
              .then(data => setSemtype(data))
      }
       fetchtype()

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

     const fetchfinal = () =>{
      fetch('http://127.0.0.1:8000/home/teachersubs')
          .then((response) => response.json())
          .then(data => setFinal(data))
  }
   fetchfinal()

    },[]);
    console.log(final)
    const [classtab, setClasstab]=useState([])
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
   
    const fetchData = async () => {
      try {
        //fetching data from class division table
        const response = await fetch('http://127.0.0.1:8000/home/teacherlogin/division');
        const jsonData = await response.json();
        setTemclass(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

//mapping

 const classtab1 = temclass.map(item1 => {
  const matchingItem = subsel.find(item2 => item2.subid === item1.subject);
  return { ...item1, ...matchingItem };
  });

  let sem;
  if(semtype.length>0){
    sem=semtype[0].sem
  }
  console.log(sem);


  const classtab2 = classtab1.map(item1 => {
    const matchingItem = depsel.find(item2 => item2.depid === item1.depid);
    return { ...item1, ...matchingItem };
    });
  console.log(classtab1)

             //odd or even
             let icd=-1; //indes for classtab
      if(sem==="odd")
      {
          for(let i=0; i<classtab2.length; i++)
          {
            if(classtab2[i].sem==="Sem 1" ||classtab2[i].sem==="Sem 3" ||
            classtab2[i].sem==="Sem 5" ||
            classtab2[i].sem==="Sem 7")
            {
              icd=icd+1;
              classtab[icd]=classtab2[i];
            }
          }
      }
      else{
        for(let i=0; i<classtab2.length; i++)
          {
            if(classtab2[i].sem==="Sem 2" ||classtab2[i].sem==="Sem 4" ||
            classtab2[i].sem==="Sem 6" ||
            classtab2[i].sem==="Sem 8")
            {
              icd=icd+1;
              classtab[icd]=classtab2[i];
            }
          }
      }     
console.log(classtab)
   
// progress
const navigate=useNavigate();
       const handleprogress=()=>{
        let demo="1"
        Prog(demo);
        navigate("/teacher/progress/"+id);
       }
  let x;
    const sendSelectedValues = async () => {//sending selected course to Api on buttom press
      try {
        let itindex=-1,hcount=0,mcount=0,ecount=0;
        for(let i=0; i<selectedRows.length; i++)
        {
          itindex++;
          selectedItems[itindex]=selectedRows[i].classid;
          console.log(selectedRows[i].subtype)
          if(selectedRows[i].subtype==="E")
          {
            ecount=ecount+1;
          }
          if(selectedRows[i].subtype=="H")
          {
            hcount=hcount+1;
          }
          if(selectedRows[i].subtype==="M")
          {
            mcount=mcount+1;
          }
        }
        console.log(hcount)
        //sending subjects to api
        if(ecount >1 || hcount>1 || mcount>1)
        {
           if(ecount>1)
           {
            alert("You cannot select more than one elective course");
           }
           else if(hcount>1)
           {
            alert("You cannot select more than one honour course");
           }
           else if(mcount>1)
           {
            alert("You cannot select more than one minor course");
           }
        }
        else{
          for(let i=x; i<6; i++)
        {
          selectedItems[i]="";
            }
        const payload = {
          no:x,
          tid:editUser.tid,
          sub1:selectedItems[0],
          sub2:selectedItems[1],
          sub3:selectedItems[2],
          sub4:selectedItems[3],
          sub5:selectedItems[4],
          sub6:selectedItems[5]
      }
      console.log(payload)
    
        // Make API call with selectedRows
        await fetch('http://127.0.0.1:8000/home/subselect', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        });
       
        }
      } catch (error) {
        console.log(error);
      }
       window.location.reload();
    };
 
    let available=0;
    for(let i=0; i<phase.length; i++)  //checking whether teacher available in current phase
    {
      if(editUser.tid==phase[i].tid)
      {
        available=1;
        break;
      }
    }
    console.log(available);
    
if(available===1) //if teacher is able to choose course
{
    let min=editUser.pos=="0"?2:(editUser.pos=="1"?1:1); 
    console.log(min);
    
    var temp=[];
    for(let i=0; i<phase.length; i++)
    {
      if(editUser.tid==phase[i].tid)
      {
        temp[0]=phase[i];
        break;
      }
    }
  ///////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////
  let ifd=-1 //index for data array
  for( let i=0; i< classtab.length; i++)//filtering out subjects opted by previos phase
  {
    if(classtab[i].classalloc!=="1" && classtab[i].depid===editUser.depid)
    {
      ifd=ifd+1;
      data[ifd]=classtab[i];
    }
  
  }

  console.log(data)

  console.log(classtab)
  //filtering
  const handleFilterChange = (event) => {
  setFilter(event.target.value);
  };

  const filteredData = data.filter((item) =>
  filter === '' ? true : item.sem === filter
  );

  if (isLoading) {
  return <div>Loading...</div>;
  }

  let hcount;
  const handleCheckboxChange = (event, row) => {   //checkbox
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      const updatedRows = selectedRows.filter((selectedRow) => selectedRow.classid !== row.classid);
      setSelectedRows(updatedRows);
    }
  };
 
  x=selectedRows.length;
  var temp1=[];
  console.log(temp[0].sub1) //temp1 saves only subject allocated by this teacher
  if(temp[0].status=="OFF")
  {
  temp1[0]=temp[0].sub1;
  temp1[1]=temp[0].sub2;
  temp1[2]=temp[0].sub3;
  temp1[3]=temp[0].sub4;
  temp1[4]=temp[0].sub5;
  temp1[5]=temp[0].sub6;
  let k=-1;
  for(let i=0; i<5; i++)
  {
  for(let j=0; j<classtab.length; j++)
  {
    if(temp1[i]==classtab[j].classid)
    {
      k++;
      view[k]=classtab[j];
      break;
    }
  }
  }
  }

  console.log(view);

  if(temp[0].status=="OFF")
  { 
  return (
    <div>
      <div className='imagebackground-app'></div>
        <div className='dash'>USER</div>
      <div>
      <button className='logout-butt'><Link to="/login" >Logout</Link></button>
      </div>
      <div className='teachpage-cont1'>
  <ul>
    <li className='contmargin1'>{editUser.tid}</li>
    <li className='list123'>{editUser.tname}</li>
    <li className='list123'>{editUser.tmail}</li>
    <li className='list123'>{editUser.pos=="0"?"Assistant Professor":(editUser.pos=="1"?"Associate proffesor":"Proffessor")}</li>
  </ul>
</div>

          <div>
            <button className='progressbutt' onClick={handleprogress}> View Progress</button>
          </div>
    <table>
      <thead>
        <tr>
          <th>Class</th>
          <th>Subject</th>
          <th>Course Name</th>
          <th>Semester</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {view.map((item) => (
          <tr key={item.classid}>
            <td>{item.classname}</td>
            <td>{item.subject}</td>
            <td>{item.subname}</td>
            <td>{item.sem}</td>
            <td>{item.subtype==="T"?"Theory":(item.subtype=="P"?"Practicals":(item.subtype=="E"?"Elective":(item.subtype=="M"?"Minor":"Honours")))}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
  }
  else
  {
  return (
    <div>
      <div className='imagebackground-app'></div>
        <div className='dash'>USER</div>
      <div>
      <button className='logout-butt'><Link to="/login" >Logout</Link></button>
      </div>
      <div className='teachpage-cont1'>
  <ul>
    <li className='contmargin1'>{editUser.tid}</li>
    <li className='list123'>{editUser.tname}</li>
    <li className='list123'>{editUser.tmail}</li>
    <li className='list123'>{editUser.pos=="0"?"Assistant Professor":(editUser.pos=="1"?"Associate proffesor":"Proffessor")}</li>
  </ul>
</div>

          <div>
            <button className='progressbutt' onClick={handleprogress}> View Progress</button>
          </div>

      <div className='title-margin'>
      <label  htmlFor="filter">Filter by Semister:</label>
      </div>

      <div className='teach-sem-drop'>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option className='teach-sem-drop' value="">All</option>
        {Array.from(new Set(data.map((item) => item.sem))).map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      </div>

      <table className='view-teach-select-container'>
        <thead>
          <tr className='header'>
                      <th>Class Name</th>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Sem</th>
                      <th>Dept Id</th>
                      <th>Type</th>
                      <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.classid}>
             
                      <td>{row.classname}</td>
                      <td>{row.subject}</td>
                      <td>{row.subname}</td>
                      <td>{row.sem}</td>
                      <td>{row.depname}</td>
                      <td>{row.subtype==="T"?"Theory":(row.subtype=="P"?"Practicals":(row.subtype=="E"?"Elective":(row.subtype=="M"?"Minor":"Honours")))}</td>
                      <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.some((selectedRow) => selectedRow.classid === row.classid)}
                    onChange={(event) => handleCheckboxChange(event, row)}
                    disabled={(selectedRows.length >= 6 && !selectedRows.some((selectedRow) => selectedRow.classid === row.classid) )}
                  />
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="updatebuttsubmit" onClick={sendSelectedValues} disabled={selectedRows.length < min}>Submit</button>
     <div>

     </div>
          
    <div className='select-row-cont'>
     <h3>Selected Rows:</h3>
        {selectedRows.length > 0 ? (
          <ol type='1'>
            {selectedRows.map(idd => (
              <li  >{idd.subname} {idd.classname}</li>
            ))}
          </ol>
        ) : (
          <p>No course selected</p>
        )}
        </div>

    </div>
  );
  }
  
}
else{//if subject selection is not enabled for teacher
  const display = final.map((dictionary) => {
    return { ...dictionary, subname1: "",subname2: "",classname1: "",classname2: "",tname: "" };
  });
 
 for(let i=0;i< display.length; i++)
 {
   for(let j=0; j<tea.length; j++)
   {
    if(display[i].tid===tea[j].tid)
    {
      display[i].tname=tea[j].tname;
    }
   }
   for( let k=0; k<classtab.length; k++)
   {
    if(display[i].sub1===classtab[k].classid)
    {
      display[i].subname1=classtab[k].subname;
      display[i].classname1=classtab[k].classname;
    }
    if(display[i].sub2===classtab[k].classid)
    {
      display[i].subname2=classtab[k].subname;
      display[i].classname2=classtab[k].classname;
    }

   }
 }
 console.log(display);


 const handleFilterChange = (event) => {
  setFilter(event.target.value);
  };

  const filteredData = display.filter((item) =>
  filter === '' ? true : item.year === filter
  );



 return(
  <div>
  <div className='imagebackground-app'></div>
        <div className='dash'>USER</div>
      <div>
      <button className='logout-butt'><Link to="/login" >Logout</Link></button>
      </div>
      <div className='teachpage-cont1'>
  <ul>
    <li className='contmargin1'>{editUser.tid}</li>
    <li className='list123'>{editUser.tname}</li>
    <li className='list123'>{editUser.tmail}</li>
    <li className='list123'>{editUser.pos=="0"?"Assistant Professor":(editUser.pos=="1"?"Associate proffesor":"Proffessor")}</li>
  </ul>
</div>


  <div>
  <label htmlFor="filter">Select Academic Year</label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="">All</option>
        {Array.from(new Set(display.map((item) => item.year))).map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
  <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>class</th>
          <th>Academic Year</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id}>
            <td>{item.tname}</td>
            <td>{item.subname1 }<br/>
            {item.subname2 }<br/>        
            </td>
            <td>{item.classname1}<br/>
            {item.classname2}<br/>
            </td>
            <td>{item.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
 )
}
}

export default Teacherpage