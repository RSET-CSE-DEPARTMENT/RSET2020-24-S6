import React, { useState } from 'react'
import { useEffect } from 'react'
import Ps1 from './Ps1'
import ps2 from './ps2'
import pstop1 from './pstop1'
import Sem from './Sem'
import App from './App'
import Prog from './prog'
import { useNavigate } from 'react-router-dom'
import pstop2 from './pstop2'
function Phase(){

  const navigate=useNavigate();
  const [year, setYear]=useState({no:"",active:""})
  const [teacher, setTeacher]=useState({})
  const [clash, setClash]=useState({})
  const [curr, setCurr]=useState({})
  let stat=0;

  const [selectedOption, setSelectedOption] = useState('');
  useEffect(()=>{
    const getUser= async()=>{
         const reqData= await fetch('http://127.0.0.1:8000/home/viewteacher/');
         const resData= reqData.json();
         setTeacher(await resData);
    }
    getUser()

    const fetchStat = () =>{
      fetch('http://127.0.0.1:8000/home/clash')
          .then((response) => response.json())
          .then(data => setClash(data))
  }
   fetchStat()
   const fetchPhase = () =>{
    fetch('http://127.0.0.1:8000/home/phasestatus')
        .then((response) => response.json())
        .then(data => setCurr(data))
}
 fetchPhase()
},[]);

 
//  let p=curr[0].active;

 var temp=[];
 
 if(clash.length !== 0)
 {
  if(clash[0]==="ok")
  {
  stat=1;
  }
  else{
  let k=-1;
  for(let i=0; i<clash.length; i++)
  {
    for(let j=0; j<teacher.length; j++)
    {
      if(clash[i].clashid===teacher[j].tid)
      {
         k=k+1;
        temp[k]=teacher[j].tname;
      }
    }
  }
   }
 }
 
 

 console.log(temp)
const handleProgress =()=>{
  let demo="1";
  Prog(demo);
  navigate("/home/sub/phase/prog")
}

const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
};

console.log(selectedOption);

const handletype=(e)=>{
   Sem(selectedOption);
}

  const handlephase1=(e)=>{
    const payload1 = {
       no:year.no,
       active:"phase1"
    }
    console.log(payload1)
    Ps1(payload1);
 }

 const handlephase2=(e)=>{
  const payload2 = {
     no:year.no,
     active:"phase2"
  }
  console.log(payload2);
ps2(payload2)
}

const stopphase1 =(e)=>{
    const paystop1 = {
        val:"1"
     }
     pstop1(paystop1);
   
}
 const stopphase2 =(e)=>{
  const paystop2 = {
      val:"1"
   }
   pstop2(paystop2);
}



  return (
    <div>
      <App />
      <h1 className="dash">SUBJECT ALLOCATION </h1>
            <br/>

      {/* <div className='checkoutline'>hi</div> */}


     <div>
      <div className='sem-outline'>
     <label>
        <input
          type="radio"
          value="odd"
          checked={selectedOption === 'odd'}
          onChange={handleOptionChange}
        />
       Odd
      </label>

      <label>
        <input
          type="radio"
          value="even"
          checked={selectedOption === 'even'}
          onChange={handleOptionChange}
        />
        Even
      </label>
      
      </div>
      <button className='updatebuttconfirm' onClick={handletype}>Confirm</button>
     </div>
     <div className='suballocont1'>
        <h2>Phase 1</h2>
        <label>Enter Phase Period</label>
        <input type="text" name="Phase" placeholder="Phase Input"  onChange={e => setYear({...year,no: e.target.value})}/><br/>
        <button className='updatebutt12' onClick={handlephase1}>START</button>
        <button className='deletebutt12' onClick={stopphase1}>STOP</button>
        </div>
       
       

        <div className='suballocont2'>
        <h2>Phase 2</h2>
        <label>Enter Phase Period</label>
        <input type="text" name="Phase" placeholder="Phase Input"  onChange={e => setYear({...year,no: e.target.value})}/><br/>
        <button className='updatebutt12' onClick={handlephase2}>START</button>
        <button className='deletebutt12' onClick={stopphase2}>STOP</button>
        </div>

       <div>
       <button className='view-in-suballo' onClick={handleProgress} disabled={stat=0}> View</button>
       </div>

       <div>
        {temp.length > 0 ? (
          <ol>
            {temp.map((temp, index) => (
          <li key={index}>{temp}</li>
            ))}
          </ol>
        ) : (stat===1 ? "Success":"")}
    </div>

    </div>
  )
}

export default Phase;