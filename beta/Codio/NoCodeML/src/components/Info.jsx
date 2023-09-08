import './Infostyle.css'
import axios from 'axios'
import { Link } from "react-router-dom"
import React, { Component } from 'react';


class Info extends Component{

  constructor(props){
      super(props);
      this.state={
          algorithm:"",
          details:"",
      }
  }
  
  getDetails = (e)=>{
    axios.defaults.withCredentials = true 
    const response= axios.post('http://localhost:8080/info', {
      data : {
          algorithm:e.target.value
      }})
      .then((response) => {
          console.log(response.data.details);
          this.setState({
            details: response.data.details.S
        });
        })
  }

render(){
  return (
    <div className='detail'>
    <div className='info-content'>
      <div className='algorithm'>
          <button className='infobutton' value="Linear Regression" onClick={(e)=>{this.getDetails(e)}}>Linear Regression</button>
      </div>
      <div className='algorithm'>
          <button className='infobutton' value="Logistic Regression" onClick={(e)=>{this.getDetails(e)}}>Logistic Regression</button>
        </div>
      <div className='algorithm'>
          <button className='infobutton' value="SVM" onClick={(e)=>{this.getDetails(e)}}>SVM</button>
        </div>
        <div className='algorithm'>
      <button className='infobutton' value="Decision Tree" onClick={(e)=>{this.getDetails(e)}}>Decision Tree</button>
        </div>

        <div className='algorithm'>
    
          <button className='infobutton' value="Random Forest" onClick={(e)=>{this.getDetails(e)}}>Randon Forest</button>
          
        </div>

        <div className='algorithm'>
          <button className='infobutton' value="KMeans" onClick={(e)=>{this.getDetails(e)}}>KMeans</button>
        </div>

        <div className='algorithm'>
        <button className='infobutton' value="KNN" onClick={(e)=>{this.getDetails(e)}}>KNN</button>
        </div>

        <div className='algorithm'>
        <button className='infobutton' value="Naive Bayes" onClick={(e)=>{this.getDetails(e)}}>Naive Bayes</button>
        </div>
        <div className='algorithm'>
        <button className='infobutton' value="ANN" onClick={(e)=>{this.getDetails(e)}}>ANN</button>
        </div>
      </div>
      <div>
      <textarea className='details' value={this.state.details}>
      </textarea>
      </div>
      </div>
  )
}
}

export default Info;