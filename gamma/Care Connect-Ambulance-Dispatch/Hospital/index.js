const express=require("express");
const bodyParser=require("body-parser");
const nodemailer=require("nodemailer");
const mongoose=require("mongoose");
const axios = require('axios');
const http=require("https");
const State=require("country-state-city").State;
const { City } = require("country-state-city");
const fetch=require("node-fetch");
const { ObjectId } = require('mongodb');
require('dotenv').config();
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:admin@ambulancedispatch.7yt2txc.mongodb.net/test",{useNewUrlParser:true});

const hospitaUserSchema=new mongoose.Schema({
    name:String,
    email:String
});

const RegisteredHospital=new mongoose.Schema({
    hospitalName:String,
    hospitalAddress:String,
    password:String,
    patient:[{
        patientName:String,
        patientNum:String,
        patientAddress:String,
        patientStatus:String,
        ambuTrack:String
    }],
    driver:[{
        driverName:String,
        driverNum:String,
        driverId:String,
        driverPass:String,
        driverStatus:String,
        patientAssign:String
    }]
});

const hospitalUser=mongoose.model("hospitalUser",hospitaUserSchema);
const hospitallist=mongoose.model("hospitallist",RegisteredHospital);

app.get("/",(req,res)=>{
    var allState=(State.getStatesOfCountry("IN"));
    var allCities={};
    for(var i=0;i<allState.length;i++){
        var city=City.getCitiesOfState("IN",allState[i].isoCode);
        allCities[allState[i].name]=city;
    }
    var allCitiesString = JSON.stringify(allCities);
    res.render("hospital-home",{allState:allState,allCitiesString:allCitiesString})
});

var latitude;
var longitude;
app.post("/",async(req,res)=>{
    try{
        var state=req.body.state;
        var city=req.body.city;
        var apiUrl = "https://nominatim.openstreetmap.org/search";
        var params = {
            q: city + ", " + state,
            format: "json",
            limit: 1
        };
    
        var queryString = Object.keys(params).map(function(key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&");
    
        var url = apiUrl + "?" + queryString;
    
        var response=await fetch(url);
        const data=await response.json();
    
            if (data.length > 0) {
                latitude = data[0].lat;
                longitude = data[0].lon;
                
            } else {
                console.log("Coordinates not found for the specified location.");
            }
      
        res.redirect("hospital");
    
        }catch(error){
            console.log("An error occured: "+error);
        }
        
});


app.get("/hospital",(req,res)=>{

    const options = {
        method: 'GET',
        hostname: 'api.foursquare.com',
        port: null,
        path: '/v3/places/search?ll='+latitude+'%2C'+longitude+'&radius=100000&categories=15000&limit=50',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Four_auth
        }
      };
    
      const apiRequest = http.request(options, function (apiResponse) {
        let responseBody = '';
    
        apiResponse.on('data', function (chunk) {
          responseBody += chunk;
        });
    
        apiResponse.on('end', function () {
          const data = JSON.parse(responseBody);
          const hospitals = data['results'];
          const filteredHospitals = hospitals.map(hospital => {
            return {
              name: hospital['name'],
              address : hospital['location']['formatted_address']
            };
          });
          res.render("hospital",{hospital:filteredHospitals});
        });
      });
    
      apiRequest.end();
});

app.post("/hospital",(req,res)=>{
    var hospitalName=req.body.hospitalName;
    var hospitalAdd=req.body.hospitalAddress;
    res.render("login",{hospitalName:hospitalName,hospitalAddress:hospitalAdd});
});


app.post("/message",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const msg=req.body.msg;
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.NODEMAILER_EMAIL,
            pass:process.env.NODEMAILER_PASS
        },
        port:465,
        host:'smtp.gmail.com'
    });
    
    const mailOption1={

        from: process.env.NODEMAILER_EMAIL,
        to:`${email}`,
        subject:"Ambulance Tracker customer care",
        text:"Thanks For Contacting Us "+`${name}`
    };

    const mailOption2={
        from:process.env.NODEMAILER_EMAIL,
        to:process.env.SECOND_EMAIL,
        subject:`${name}`,
        text:"name:- "+`${name}`+"\n email:- "+`${email}`+"\n message:- "+`${msg}`
    }

    transporter.sendMail(mailOption1,(error,info)=>{
        if(error){
            console.log(error);
            res.send("error sending email");
        }
        else{
            console.log("email sent: "+info.response);
            res.send("email sent successfully");
        }
    });

    transporter.sendMail(mailOption2,(error,info)=>{
        if(error){
            console.log(error);
            res.send("error sending email");
        }
        else{
            console.log("email sent: "+info.response);
            res.send("email sent successfully");
        }
    });
    


    hospitalUser.findOne({ email: email }).then(function(elem) {
        if (!elem) {
          const newUser = new hospitalUser({
            name: name,
            email: email
          });
          newUser.save();
        }
      }).catch((err) => {
        console.log(err);
      });
        
    res.render("message");
  
});

app.get("/message",(req,res)=>{
   res.render("message");
});


var hospitalName;
var hospitalAddress;
app.post("/login",async(req,res)=>{
   function getvalue(){
      hospitalName=req.body.hospitalName;
      hospitalAddress=req.body.hospitalAddress;
   }
   
   await getvalue();
   hospitallist.findOne({ hospitalName:hospitalName , hospitalAddress:hospitalAddress,password:req.body.password }).then(function(elem) {
    if (!elem) {
       res.render("login",{hospitalName:req.body.hospitalName,hospitalAddress:req.body.hospitalAddress});
    }
    else{
        res.render("home",{hospitalName:hospitalName,hospitalAddress:hospitalAddress});
    }
  }).catch((err) => {
    console.log(err);
  });
});

app.post("/signup",(req,res)=>{
    hospitalName=req.body.hospitalName;
    hospitalAddress=req.body.hospitalAddress;
    res.render("signup",{hospitalName:hospitalName,hospitalAddress:hospitalAddress});
});

app.post("/register",(req,res)=>{
    hospitalName=req.body.hospitalName;
    hospitalAddress=req.body.hospitalAddress;
    hospitallist.findOne({ hospitalName:hospitalName , hospitalAddress:hospitalAddress}).then(function(elem) {
        if (!elem) {
            const newHospital = new hospitallist({
                hospitalName:req.body.hospitalName,
                hospitalAddress:req.body.hospitalAddress,
                password:req.body.password
              });
              newHospital.save();
              res.render("home",{hospitalName:hospitalName,hospitalAddress:hospitalAddress});
        }
        else{
            res.render("login",{hospitalName:req.body.hospitalName,hospitalAddress:req.body.hospitalAddress})
        }
      }).catch((err) => {
        console.log(err);
      });
});

app.post("/pending",(req,res)=>{
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then(function(element){
        if(!element){
            res.send("hospital not found");
        }
        else{
            const pending=element.patient.filter((patient)=>patient.patientStatus==="pending");
            res.render("pending",{hospitalName:hospitalName,elem:pending,hospitalAddress:hospitalAddress});
        }
    });
});

app.get("/pending",(req,res)=>{
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then(function(element){
        if(!element){
            res.send("hospital not found");
        }
        else{
            const pending=element.patient.filter((patient)=>patient.patientStatus==="pending");
            res.render("pending",{hospitalName:hospitalName,elem:pending,hospitalAddress:hospitalAddress});
        }
    });
});


app.post("/active",(req,res)=>{
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then((element)=>{
          if(!element){
            res.send("hospital not found");
          }
          else{
            const active=element.patient.filter((patient)=>patient.patientStatus==="active");
            var driverName=[];
            var driverNum=[];
            for(var i=0;i<active.length;i++){
                const driver = element.driver.find((driver) => (driver.patientAssign)===active[i]._id.toString());
                if (driver) {
                    driverName.push(driver.driverName);
                    driverNum.push(driver.driverNum);
                  }
            }
            res.render("activeCase",{hospitalName:hospitalName,elem:active,hospitalAddress:hospitalAddress,driverName:driverName,driverNum:driverNum});
          }
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/active",(req,res)=>{
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then((element)=>{
          if(!element){
            res.send("hospital not found");
          }
          else{
            const active=element.patient.filter((patient)=>patient.patientStatus==="active");
            var driverName=[];
            var driverNum=[];
            for(var i=0;i<active.length;i++){
                const driver = element.driver.find((driver) => (driver.patientAssign)===active[i]._id.toString());
                if (driver) {
                    driverName.push(driver.driverName);
                    driverNum.push(driver.driverNum);
                  }
            }
            res.render("activeCase",{hospitalName:hospitalName,elem:active,hospitalAddress:hospitalAddress,driverName:driverName,driverNum:driverNum});
          }
    }).catch((err)=>{
        res.send(err);
    });
});

app.post("/completed",(req,res)=>{
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then(function(element){
        if(!element){
            res.send("hospital not found");
        }
        else{
            const complete=element.patient.filter((patient)=>patient.patientStatus==="complete");
            res.render("completeCase",{hospitalName:hospitalName,elem:complete,hospitalAddress:hospitalAddress});
        }
    });
});

app.get("/completed",(req,res)=>{
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then(function(element){
        if(!element){
            res.send("hospital not found");
        }
        else{
            const complete=element.patient.filter((patient)=>patient.patientStatus==="complete");
            res.render("completeCase",{hospitalName:hospitalName,elem:complete,hospitalAddress:hospitalAddress});
        }
    });
});



app.post("/reject", async (req, res) => {
    var patientId=req.body.patientId;
    var hospitalName=req.body.hospitalName;
    var hospitalAddress=req.body.hospitalAddress;
    try {
        await hospitallist.updateOne(
            { hospitalName:hospitalName,hospitalAddress:hospitalAddress },
            { $pull: { patient: { _id: new ObjectId(patientId) } } }
        );
        console.log('Subdocument deleted successfully');
        res.redirect("pending");
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

app.post("/assign",async(req,res)=>{
   var patientAddress=req.body.patientAddress;
   var patientNum=req.body.patientNum;
   var patientName=req.body.patientName;
   var patientId=req.body.patientId;
   var hospitalName=req.body.hospitalName;
   var hospitalAddress=req.body.hospitalAddress;

   hospitallist.findOneAndUpdate({hospitalName:hospitalName,hospitalAddress:hospitalAddress,"patient._id":patientId},{$set:{"patient.$.patientAddress":patientAddress,"patient.$.ambuTrack":"approved by hospital"}}).then((hospital)=>{
    if(!hospital){
        res.send("hospital not found");
    }
    else{
        res.render("assign",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,patientId:patientId});
    }
   }).catch((err)=>{
    res.send(err);
   })
   
});


// get the active driver list 

app.post("/activeDriver",(req,res)=>{
   var hospitalName=req.body.hospitalName;
   var hospitalAddress=req.body.hospitalAddress;
   var patientId=req.body.patientId;
   hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then((hospital)=>{
    if(!hospital){
        res.send("hospital not found");
    }
    else{
        const driver=hospital.driver.filter((driver)=>driver.driverStatus==="active");
       res.render("activeDriver",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,patientId:patientId,driver:driver});
    }
   }).catch((err)=>{
    res.send(err);
   });
   
});


app.post("/assignDriver",(req,res)=>{
      var hospitalName=req.body.hospitalName;
      var hospitalAddress=req.body.hospitalAddress;
      var patientId=req.body.patientId;
      var driverId=req.body.driverId;
     
      hospitallist.findOneAndUpdate({hospitalName:hospitalName,hospitalAddress:hospitalAddress,"driver.driverId":driverId},{$set:{"driver.$.driverStatus":"working","driver.$.patientAssign":patientId}}).then((hospital)=>{
        if(!hospital){
            res.send("hospital not found");
        }
        else{
            hospitallist.findOneAndUpdate({hospitalName:hospitalName,hospitalAddress:hospitalAddress,"patient._id":patientId},{$set:{"patient.$.patientStatus":"active","patient.$.ambuTrack":"ambulance assigned"}}).then((hospital)=>{
                if(!hospital){
                    res.send("2nd time hospital is not found");
                }
                else{
                    res.redirect("/pending");
                }
            }).catch((err)=>{
                res.send(err);
            });
        }
      }).catch((err)=>{
        res.send(err);
      })
});


app.post("/WorkingDriver",(req,res)=>{
    var hospitalAddress=req.body.hospitalAddress;
    var patientId=req.body.patientId;
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then((hospital)=>{
     if(!hospital){
         res.send("hospital not found");
     }
     else{
         const driver=hospital.driver.filter((driver)=>driver.driverStatus==="working");
        res.render("WorkingDriver",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,patientId:patientId,driver:driver});
     }
    }).catch((err)=>{
     res.send(err);
    });
});

app.post("InActiveDriver",(req,res)=>{
    var hospitalAddress=req.body.hospitalAddress;
    var patientId=req.body.patientId;
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then((hospital)=>{
     if(!hospital){
         res.send("hospital not found");
     }
     else{
         const driver=hospital.driver.filter((driver)=>driver.driverStatus==="sleep");
        res.render("InActiveDriver",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,patientId:patientId,driver:driver});
     }
    }).catch((err)=>{
     res.send(err);
    });
});




app.listen(process.env.PORT || 3001);
