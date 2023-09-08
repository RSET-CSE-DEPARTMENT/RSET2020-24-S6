import React, { Component } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import './style2.css' 

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            access: false
        }
    }


changePassword = (e)=> {
    this.setState({
        password: e.target.value
    }); //semicolon reqd
}

changeEmail = (e)=> {
    this.setState({
        email: e.target.value
    }); 
}
submitForm = (e)=> {
    window.open("/main_area",'_self');
}
//  submitForm = (e)=> {
//     e.preventDefault();
//     console.log("hello")
//     axios.defaults.withCredentials = true //since no ssl..
//     const response= axios.post('http://localhost:8080/login', {
//         data : {
//             email:this.state.email,
//             //password:this.state.password,
//         }})
//         .then((response) => {
//             console.log(response.data.password);
//             if(response.data.status.S ==='admin' && response.data.password.S===this.state.password)
//             {
//                 localStorage.setItem("username", response.data.name.S);
//                 console.log(localStorage.getItem("username"));
//                 window.open("/admin",'_self');
//             }
//             else if(response.data.status.S==='user' && response.data.password.S===this.state.password)
//             {
//                 console.log("valid credentials")
//                 this.setState({
//                     access: true
//                 }); 
//                 window.open("/main_area",'_self');
            
//             }
//             else
//             {
//                 console.log("invalid credentials")
//                 window.alert("Invalid Credentials !!")
//                 this.setState({
//                     access: false
//                 });
//                 // <div>
//                 //     <Alert severity="error">This is an error alert — check it out!</Alert>
//                 // </div>
//             }  
//           })
//         console.log(response);
           
         
          
    
//  }
render(){
    return(
            <div >
                <div class='form'>
                <div class="card">
                <h2>Login</h2>
                    <div class="input">
                        <div class="inputBox">
                        <label>Email</label>
                        <input type="text" placeholder="Email" onChange={this.changeEmail}/>
                        </div>
                    <div class="inputBox">
                        <label>Password</label>
                        <input type="password" placeholder="· · · · · ·" onChange={this.changePassword}/>
                    </div>
                    <div class="inputBox">
                        <input type="submit" value="Sign in" onClick={(e)=>{this.submitForm(e)}}/>
                    </div>
                </div>
                <p class="forget">Don't have an account? </p>
                <Link to="/signup" className='input'>Sign Up</Link>
                </div>
                </div>
            </div>
    );
}
}
export default Login;
