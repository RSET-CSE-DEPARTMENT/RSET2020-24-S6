import React, { Component } from 'react';
import axios from 'axios'
import validator from "validator";
import './style2.css' 
import { Link } from "react-router-dom";
class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            phone: "",
            email: "",
            password: "",
        }
    }

changeName = (e)=> {
    this.setState({
        name: e.target.value
    }); //semicolon reqd
}
changePhone = (e)=> {
    this.setState({
        phone: e.target.value
    });
}
changeEmail = (e)=> {
    this.setState({
        email: e.target.value
    }); 
}
changePassword = (e)=> {
    this.setState({
        password: e.target.value
    });
}
setMessage =(e)=>{
    this.setState({
        message: e
    });
}
 signUp = (e)=> {
    e.preventDefault();
    if (this.state.name === '' || this.state.email === '' || this.state.password === '' ||this.state.phone==='') {
        console.log("empty field..");
        window.alert("Empty Field !");
    } 
    else if(this.state.phone.length>10)
    {
        window.alert("Invalid Phone Number !");
        console.log("invalid phone no.");
    }
    else if(!(validator.isEmail(this.state.email)))
    {
        window.alert("Invalid Email !");
        console.log("invalid email");
    }
    else if(this.state.phone.password<8)
    {
        window.alert("Invalid Password! - must have 8 characters");
        console.log("invalid phone no.");
    }
    else {
        axios.defaults.withCredentials = true //since no ssl..
    axios.post('http://localhost:8080/signup', {
        data : {
            name:this.state.name,
            phone:this.state.phone,
            email:this.state.email,
            password:this.state.password,
        }
     });
     window.open("/login",'_self');   
    }
 }

render(){
    return(
        <div>
        <div>
          <div class="form">
              <div class="card">
             <h2>Sign-up</h2>
                 <div class="input">
                     <div class="inputBox">
                     <label>Name</label>
                     <input type="text" placeholder="Name" onChange={this.changeName}/>
                     </div>
                 <div class="inputBox">
                      <label>Email</label>
                      <input type="text" placeholder="email" onChange={this.changeEmail}/>
                 </div>
                 <div class="inputBox">
                      <label>Phone Number</label>
                      <input type="text" placeholder="Phone Number" onChange={this.changePhone}/>
                 </div>
                 <div class="inputBox">
                      <label>Password</label>
                      <input type="password" placeholder="Password" onChange={this.changePassword}/>
                 </div>
                 <div class="inputBox">
                      <input type="submit" value="Sign up" onClick={(e)=>{this.signUp(e)}}/>
                 </div>
                  
                <p class="forget">Already have an account? </p>
                <Link to="/login" className='background-color-red p-2 rounded-lg text-sm text-center'>Login</Link>
                
            </div>
            </div>
            </div>
            </div> 
        </div>  
        
    )
}
}
export default Signup;
