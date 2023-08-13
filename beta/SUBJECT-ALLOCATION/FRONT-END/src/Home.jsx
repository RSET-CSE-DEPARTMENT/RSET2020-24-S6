import react, { useState } from "react";
import { useEffect } from "react";
import "./home.css"
import App from "./App";
function Home(){
    

     const[teacher, setTeacher]=useState([]);
     const[dept, setDept]=useState([]);
     const[subject, setSubject]=useState([]); 

    useEffect(()=>{
        const getUser= async()=>{
             const reqData= await fetch('http://127.0.0.1:8000/home/viewteacher/');
             const resData= reqData.json();
             setTeacher(await resData);
        }
        getUser()
    
        const fetchStat = () =>{
          fetch('http://127.0.0.1:8000/home/department')
              .then((response) => response.json())
              .then(data => setDept(data))
      }
       fetchStat()
  
       const fetchphase = () =>{
          fetch('http://127.0.0.1:8000/home/subject/')
              .then((response) => response.json())
              .then(data => setSubject(data))
      }
       fetchphase()
    },[]);
   



    return(
        <div>
        <App/>
        {/* <div className="imagebackground-app"></div> */}
            <h1 className="dash">DASHBOARD </h1>
            <br/>
            <div className="box2">
            <div>
                 <h4 className="dashtitle">TEACHER</h4>
                 <p className="dashsubtitle">Total no : {teacher.length}</p>
            </div></div>


            <div className="box3">
            <div>
            <h4 className="dashtitle">DEPARTMENT</h4>
            <p className="dashsubtitle">Total no : {dept.length}</p>
            </div>
            </div>
            
            <div className="box4">
            <div>
            <h4 className="dashtitle">COURSE</h4>
            <p className="dashsubtitle">Total no : {subject.length}</p>
            </div>
            </div>
            
            
           
        </div>
    );
}
export default Home;