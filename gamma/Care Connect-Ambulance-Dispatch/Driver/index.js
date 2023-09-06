const express=require("express");
const bodyParser=require("body-parser");
const nodemailer=require("nodemailer");
const mongoose=require("mongoose");
const axios = require('axios');
const http=require("https");
const State=require("country-state-city").State;
const fetch=require("node-fetch");
const { City } = require("country-state-city");
const { ObjectId } = require('mongodb');
require("dotenv").config();
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin:admin@ambulancedispatch.7yt2txc.mongodb.net/test",{useNewUrlParser:true});

const driverUserSchema=new mongoose.Schema({
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

const driverUser=mongoose.model("driverUser",driverUserSchema);
const hospitallist=mongoose.model("hospitallist",RegisteredHospital);

app.get("/",(req,res)=>{
    var allState=(State.getStatesOfCountry("IN"));
    var allCities={};
    for(var i=0;i<allState.length;i++){
        var city=City.getCitiesOfState("IN",allState[i].isoCode);
        allCities[allState[i].name]=city;
    }
    var allCitiesString = JSON.stringify(allCities);
    res.render("driver-home",{allState:allState,allCitiesString:allCitiesString});
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
      
        res.redirect("/hospital");
    
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
        subject:"CareConnect customer care",
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
    


    driverUser.findOne({ email: email }).then(function(elem) {
        if (!elem) {
          const newUser = new driverUser({
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


//  handling login page and signup page 

app.post("/login",async(req,res)=>{
    var hospitalName;
    var hospitalAddress;
    var driverName;
    var driverId;
    var password;
    function getvalue(){
        hospitalName=req.body.hospitalName;
        hospitalAddress=req.body.hospitalAddress;
        driverName=req.body.driverName;
        driverId=req.body.driverId;
        password=req.body.password;
    }
    await getvalue();
    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then(function(hospital){
        if(!hospital){
            res.send("hospital not found");
        }
        else{
            const driver=hospital.driver.filter((driver)=>driver.driverName===driverName && driver.driverId===driverId && driver.driverPass===password);
            if(driver.length==0){
                res.render("login",{hospitalName:hospitalName,hospitalAddress:hospitalAddress});
            }
            else{
                res.render("driverProfile",{hospitalName:hospitalName,driverId:driverId,hospitalAddress:hospitalAddress});
            }
        }
    }).catch((err)=>{
        console.log(err);
    })
});

app.post("/driverProfile",(req,res)=>{
    var hospitalName=req.body.hospitalName;
    var hospitalAddress=req.body.hospitalAddress;
    var driverId=req.body.driverId;
    res.render("driverProfile",{hospitalName:hospitalName,driverId:driverId,hospitalAddress:hospitalAddress});
});

app.post("/signup",(req,res)=>{
    hospitalName=req.body.hospitalName;
    hospitalAddress=req.body.hospitalAddress;
    res.render("signup",{hospitalName:hospitalName,hospitalAddress:hospitalAddress});
});

app.post("/register",(req,res)=>{
   var hospitalName=req.body.hospitalName;
   var hospitalAddress=req.body.hospitalAddress;
   var driverName=req.body.driverName;
   var driverId=req.body.driverId;
   var password=req.body.password;
   var driverNum=req.body.driverNum;
   hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then(function(hospital){
    if(!hospital){
        res.send("hospital Not Found");
    }
    else{
        const driver=hospital.driver.filter((driver)=>driver.driverId===driverId);
        if(driver.length!=0){
            res.render("signup",{hospitalName:hospitalName,hospitalAddress:hospitalAddress});
        }
        else{
            hospitallist.findOneAndUpdate(
                {hospitalName:hospitalName,hospitalAddress:hospitalAddress},
                { $push: { driver: { driverName: driverName, driverNum: driverNum,driverId:driverId,driverPass:password,driverStatus:'sleep' } } },
                { new: true }
                ) .then((updatedDriver) => {
                if (!updatedDriver) {
                    res.send("Hospital is not registered");
                } else {
                    console.log("Driver updated successfully");
                    res.render("driverProfile",{elem:updatedDriver,driverId:driverId,driverName:driverName});
                }
                })
                .catch((error) => {
                console.log("Error updating pending case:", error);
                res.render("signup",{hospitalName:hospitalName,hospitalAddress:hospitalAddress});
                });
        }
    }

   }).catch((err)=>{
    console.log(err);
   });

});



app.post("/status", (req, res) => {
    var hospitalName = req.body.hospitalName;
    var hospitalAddress = req.body.hospitalAddress;
    var driverId = req.body.driverId;
    var status = req.body.status;
  
    hospitallist
      .findOneAndUpdate(
        {
          hospitalName: hospitalName,
          hospitalAddress: hospitalAddress,
          "driver.driverId": driverId 
        },
        {
          $set: { "driver.$.driverStatus": status } 
        },
        { new: true }
      )
      .then((updatedHospital) => {
        if (!updatedHospital) {
          res.send("Hospital not found");
        } else {
          res.render("currentStatus",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,driverId:driverId,driverStatus:status});
        }
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  });

  app.post("/currentStatus",async(req,res)=>{
    var driverId=req.body.driverId;
    var hospitalName=req.body.hospitalName;
    var hospitalAddress=req.body.hospitalAddress;
    var status;
    hospitallist.findOne({
        hospitalName:hospitalName,
        hospitalAddress:hospitalAddress,
    }).then((hospital)=>{
        if(!hospital){
            res.send("Hospital Not Found");
        }
        else{
            const driver=hospital.driver.filter((driver)=>driver.driverId===driverId);
            if(driver.length==0){
                res.send("Driver not found");
            }
            else{
                status=driver[0].driverStatus;
                if(status!='working'){
                    res.render("currentStatus",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,driverId:driverId,driverStatus:status});
                }
                else{
                    var patientName;
                    var patientAddress;
                    var patientPhoneNum;
                    hospitallist.findOne({hospitalName:hospitalName,hospitalAddress:hospitalAddress}).then((hospital)=>{
                        if(!hospital){
                            res.send("hospital not found");
                        }
                        else{
                            const driver = hospital.driver.find((driver) => driver.driverId === driverId);
                            if (!driver) {
                              res.send('Driver not found');
                            }
                             
                            var patientId=driver.patientAssign;
                            console.log(hospital.patient[0]._id);
                            const patient = hospital.patient.find((patient) => patient._id.equals(new ObjectId(patientId)));
                            
                            if(!patient){
                                res.send("patient not found");
                            }
                            patientName=patient.patientName;
                            patientAddress=patient.patientAddress;
                            patientPhoneNum=patient.patientNum;
                            res.render("workingStatus",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,patientName:patientName,patientAddress:patientAddress,patientNum:patientPhoneNum,driverId:driverId,patientId:patientId});
                        }
                    }).catch((err)=>{
                        res.send(err);
                    })
                    
                }
            }
        }
    }).catch((err)=>{
        res.send(err);
    });

});



app.post("/workingStatus",async(req,res)=>{
      var driverId=req.body.driverId;
      var hospitalName=req.body.hospitalName;
      var hospitalAddress=req.body.hospitalAddress;
      var patientId=req.body.patientId;
      

      await hospitallist.findOneAndUpdate({hospitalName:hospitalName,hospitalAddress:hospitalAddress,"driver.driverId":driverId},{$set:{"driver.$.driverStatus":"active","driver.$.patientAssign":""}});

      hospitallist.findOneAndUpdate({hospitalName:hospitalName,hospitalAddress:hospitalAddress,"patient._id":patientId},{$set:{"patient.$.patientStatus":"complete","patient.$.ambuTrack":"reached"}}).then(()=>{
        res.render("currentStatus",{hospitalName:hospitalName,hospitalAddress:hospitalAddress,driverId:driverId,driverStatus:"active"});
      }).catch((err)=>{
        res.send(err);
      })

});
  



app.listen(process.env.PORT || 3002);

