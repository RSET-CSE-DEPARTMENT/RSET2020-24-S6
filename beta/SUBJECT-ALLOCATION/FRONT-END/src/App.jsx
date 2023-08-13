import "./App.css";
// import "./Navbar.css";
import Home from "./Home";
import Subject from "./Subject";
import Addstaff from "./Addstaff";
import ViewTeacher from "./ViewTeacher";
import { Routes, Route, Link } from "react-router-dom";
import Update from "./Update";
import Login from "./Login";
import ALogin from "./ALogin";
import ViewSubject from "./ViewSubject";
import Updatesub from "./Updatesub";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
// import "./style.css"
function App() {

 
  return (

    
    <div>
      <div className="imagebackground-app"></div>
      {/* <div className="list"> */}
    <Menu>
      <h2>Administrator</h2><br/>
        <Link to="/home" className="nav-item">Home</Link>
        <Link to="/home/viewdepartment" className="nav-item">Department</Link>
        <Link to="/home/viewteacher" className="nav-item">Teacher</Link>
        <Link to="/home/sub" className="nav-item">Subject</Link>
        <Link to="/login" className="nav-item">Logout</Link>
      </Menu>   

 

{/*  
    </div> */}
    </div>
  );
  
  
};
export default App;
