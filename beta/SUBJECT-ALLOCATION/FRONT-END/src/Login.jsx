import React from "react";
import Home from "./Home";
import Subject from "./Subject";
import Addstaff from "./Addstaff";
import ViewTeacher from "./ViewTeacher";
import { Routes, Route, Link } from "react-router-dom";
import Update from "./Update";
import ALogin from "./ALogin";
import ViewSubject from "./ViewSubject";
import Login1 from "./Login1";
import ViewDept from "./ViewDept";
import Adddept from "./Adddept";
import Sub from "./sub";
import Phase from "./Phase";
import Updatesub from "./Updatesub";
import TLogin from "./TLogin";
import Teacherpage from "./Teacherpage";
import Updatedept from "./Updatedept";
import Progress from "./Progress";
import Admprog from "./Admprog";
function Login() {
  
    return(
        <div>
            
            
            <div>
            <Routes>
                <Route path="/" element={<Login1 />}></Route>
        <Route path="/login" element={<Login1 />}></Route>
        <Route path="/login/admin" element={<ALogin />}></Route>
        <Route path="/login/teacher" element={<TLogin />}></Route>

        <Route path="/home" element={<Home />}></Route>
        <Route path="/teacher/:id" element={<Teacherpage />}></Route>
        <Route path="/teacher/progress/:id" element={<Progress />}></Route>
        <Route path="/home/viewteacher" element={<ViewTeacher />}></Route>

        <Route path="/home/sub" element={<Sub />}></Route>
        
        <Route path="/home/sub/phase" element={<Phase />}></Route>
        <Route path="/home/sub/phase/prog" element={<Admprog />}></Route>
        <Route path="/home/viewsubject" element={<ViewSubject />}></Route>
        <Route path="/home/viewdepartment" element={<ViewDept />}></Route>
        <Route path="/home/subject" element={<Subject />}></Route>
        <Route path="/home/department" element={<Adddept />}></Route>
        <Route path="/home/addstaff" element={<Addstaff />}></Route>
        <Route path="/update/:tid" element={<Update />}></Route>
        <Route path="/updatesub/:subid" element={<Updatesub />}></Route>
        <Route path="/updatedept/:depid" element={<Updatedept />}></Route>
</Routes>
            </div>
          
        </div>
    );
}
export default Login;