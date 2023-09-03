const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const firebase = require("firebase");
const firebaseConfig = require("./public/js/firebaseConfig");
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "API KEY HERE",
  apiSecret: "API SECRET HERE"
})

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const app=express();

////////////////// Define an asynchronous function named fetchChartData////////////////////////////////
async function fetchChartData() {
  try {
    // Fetch the readings data from the Firebase database
    const readingsSnapshot = await firebase.database().ref("DHT/readings").once("value");
    const allReadings = readingsSnapshot.val();

    // Get the current date and format it to exclude the time part
    const currentDate = new Date().toISOString().split('T')[0];

    // Initialize arrays to store data for the past seven days
    const pastSevenDays = [];
    const temperatureArray = [];
    const humidityArray = [];
    const moistureArray = [];

    // Calculate the dates for the past seven days and store them in an array
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      pastSevenDays.push(formattedDate);  // Store the past 7 days from the current date in the array
    }

    // Iterate through the past seven days
    for (const day of pastSevenDays) {
      // Filter readings for the current day
      const filteredReadings = Object.values(allReadings).filter(reading => reading.date === day);

      // Extract temperature data and calculate the weekly average
      const temperatures = filteredReadings.map(reading => reading.temperature);
      const averageTemperature = calculateAverageWeekly(temperatures);
      temperatureArray.push(averageTemperature);

      // Extract humidity data and calculate the weekly average
      const humidities = filteredReadings.map(reading => reading.humidity);
      const averageHumidity = calculateAverageWeekly(humidities);
      humidityArray.push(averageHumidity);

      // Extract moisture data and calculate the weekly average
      const moistures = filteredReadings.map(reading => reading.moisture);
      const averageMoisture = calculateAverageWeekly(moistures);
      moistureArray.push(averageMoisture);
    }

    // Return an object containing arrays of temperature, humidity, and moisture data, reversing the order for presentation
    return {
      temperatureArray: temperatureArray.reverse(),
      humidityArray: humidityArray.reverse(),
      moistureArray: moistureArray.reverse()
    };
  } catch (error) {
    // Handle any errors that occur during the process
    throw error;
  }
}

//////////////////Function to calculate average of values////////////////////////////////
function calculateAverageWeekly(values) {
  const sum = values.reduce((total, value) => total + value, 0);
  return sum / values.length || 0;
}

//////////////// Define a function named read_sensor that returns a Promise///////////////////////
function read_sensor() {
  return new Promise((resolve, reject) => {
    // Create a reference to the 'readings' location in the Firebase database
    const readingsRef = firebase.database().ref('DHT/readings');

    // Use the 'once' method to fetch the data once from the database
    readingsRef.once('value')
      .then((snapshot) => {
        // Retrieve all the readings from the database
        const allReadings = snapshot.val();
        
        // Convert the readings into an array
        const readingsArray = Object.values(allReadings);
        
        // Get the last two readings from the array
        const lastThreeReadings = readingsArray.slice(-2);

        // Calculate the average of the last three readings
        const averageReading = calculateAverage(lastThreeReadings);

        // Create an object containing the average values with two decimal places
        const averageObj = {
          humidity: parseFloat(averageReading.humidity.toFixed(2)),
          moisture: parseFloat(averageReading.moisture.toFixed(2)),
          temperature: parseFloat(averageReading.temperature.toFixed(2))
        };

        // Resolve the Promise with the average reading object
        resolve(averageObj);
      })
      .catch((error) => {
        // Handle errors if there are any
        console.error('Error reading data:', error);
        reject(error);
      });
  });
}

///////////////// Define a function named calculateAverage that takes an array of readings as input///////////////////
function calculateAverage(readings) {
  // Check if the input array is empty
  if (readings.length === 0) {
    // If there are no readings, return an object with all values set to 0
    return { humidity: 0, moisture: 0, temperature: 0 };
  }

  // Use the reduce method to calculate the sum of all readings
  const sum = readings.reduce((acc, reading) => {
    return {
      humidity: acc.humidity + reading.humidity,
      moisture: acc.moisture + reading.moisture,
      temperature: acc.temperature + reading.temperature
    };
  }, { humidity: 0, moisture: 0, temperature: 0 });

  // Calculate the average by dividing the sum by the number of readings
  const average = {
    humidity: sum.humidity / readings.length,
    moisture: sum.moisture / readings.length,
    temperature: sum.temperature / readings.length
  };

  // Return the average reading object
  return average;
}


/////////////// Define an asynchronous function named readCropData///////////////
async function readCropData() {
  // Create a reference to the 'crops' location in the database (replace with your actual path)
  const ref = db.ref('crops');

  try {
    // Fetch data once from the database
    const snapshot = await ref.once('value');
    
    // Extract the data from the snapshot
    const data = snapshot.val();

    // Convert the data into an array of readings
    const readingsArray = Object.values(data);

    // Return the array of readings
    return readingsArray;
  } catch (error) {
    // Handle any errors that occur during the process and throw a new error with a descriptive message
    throw new Error('Error reading data: ' + error);
  }
}


// Set up your Express application
app.use(express.static("public")); // Serve static files from the 'public' directory
app.set('views', "views"); // Set the 'views' directory for EJS templates
app.set('view engine', 'ejs'); // Set the view engine to EJS
app.use(bodyParser.urlencoded({ extended: true })); // Enable URL-encoded body parsing

// Define a route for the root URL ("/") and handle it with a callback function
app.get("/", function(req, res) {
    // Send the "home.html" file as a response when the root URL is accessed
    res.sendFile(__dirname + "/home.html");
});

// Define a route for the "/login.html" URL and handle it with a callback function
app.get("/login.html", function(req, res) {
    // Send the "login.html" file as a response when the "/login.html" URL is accessed
    res.sendFile(__dirname + "/login.html");
});


// Define a route for the "/dashboard" URL and handle it with a callback function
app.get("/dashboard", async function(req, res) {
  // Fetch sensor data asynchronously and store it in 'readings'
  const readings = await read_sensor();

  // Fetch chart data asynchronously and store it in 'temperatureArray', 'humidityArray', and 'moistureArray'
  const { temperatureArray, humidityArray, moistureArray } = await fetchChartData();

  // Render the "dashboard" view, passing the data to the template
  res.render("dashboard", {
    readings: readings,
    temperature: temperatureArray,
    humidity: humidityArray,
    moisture: moistureArray
  });
});

// Define a route for the "/add_crop.html" URL and handle it with a callback function
app.get("/add_crop.html", function(req, res) {
  // Send the "add_crop.html" file as a response when the "/add_crop.html" URL is accessed
  res.sendFile(__dirname + "/add_crop.html");
});

// Define a route for the "/disease.html" URL and handle it with a callback function
app.get("/disease.html", function(req, res) {
  // Send the "disease.html" file as a response when the "/disease.html" URL is accessed
  res.sendFile(__dirname + "/disease.html");
});

// Define a route for the "/more.html" URL and handle it with a callback function
app.get("/more.html", function(req, res) {
  // Send the "more.html" file as a response when the "/more.html" URL is accessed
  res.sendFile(__dirname + "/more.html");
});

// Define a route for the "/register.html" URL and handle it with a callback function
app.get("/register.html", function(req, res) {
  // Send the "register.html" file as a response when the "/register.html" URL is accessed
  res.sendFile(__dirname + "/register.html");
});


// Define a route for the "/marketplace" URL and handle it with a callback function
app.get("/marketplace", async function(req, res) {
  try {
    // Fetch crop data asynchronously and store it in 'reading'
    const reading = await readCropData();
    console.log(reading); // Log the fetched crop data to the console

    // Get the current date and time
    var now = new Date(); // Current time
    console.log(now); // Log the current time to the console

    // Render the "marketplace" view, passing the data to the template
    res.render("marketplace", { title: 'marketplace', crops: reading });
  } catch (error) {
    // Handle any errors that occur during the process
    console.log("Error:", error); // Log the error to the console
    res.status(500).send("An error occurred"); // Send a 500 Internal Server Error response
  }
});


app.listen(3000,function(){
    console.log("Server started on port 3000");
})

// Define a route for handling the POST request when a user registers
app.post("/register", async function(req, res) {
  // Extract user registration data from the request body
  const name = req.body.name;
  const email = req.body.username;
  const password = req.body.password;
  const address = req.body.address;

  try {
    // Create a new user entry in the database
    const newUserRef = db.ref("users").push();
    
    // Set the user data in the database
    newUserRef.set({
      name: name,
      email: email,
      password: password,
      address: address
    });

    // Log a message to indicate that user data has been saved to Firebase
    console.log("User data saved to Firebase");

    // Fetch sensor data asynchronously
    const readings = await read_sensor();

    // Fetch chart data asynchronously
    const { temperatureArray, humidityArray, moistureArray } = await fetchChartData();

    // Render the "dashboard" view, passing the data to the template
    res.render("dashboard", {
      readings: readings,
      temperature: temperatureArray,
      humidity: humidityArray,
      moisture: moistureArray
    });
  } catch (err) {
    // Handle any errors that occur during the registration process
    console.log(err);
  }

  // Fetch sensor data and chart data again (outside the try-catch block) and render the "dashboard" view
  const readings = await read_sensor();
  const { temperatureArray, humidityArray, moistureArray } = await fetchChartData();
  res.render("dashboard", {
    readings: readings,
    temperature: temperatureArray,
    humidity: humidityArray,
    moisture: moistureArray
  });
})

// Define an asynchronous function named myFunction
async function myFunction() {
  // Fetch sensor data asynchronously and store it in 'readi'
  const readi = await read_sensor();
  
  // Define sender information and recipient phone number (replace 'MOBILE NUMBER WITH COUNTRY CODE' with the actual phone number)
  const from = "Vonage APIs";
  const to = "MOBILE NUMBER WITH COUNTRY CODE (e.g., 919876123400)";

  // Compose the SMS text message based on sensor data
  let text = 'Your plant health is below the optimal level. Temperature=' + readi.temperature + ' Moisture=' + readi.moisture + ' Humidity=' + readi.humidity;

  // Define an asynchronous function to send SMS
  async function sendSMS() {
    try {
      // Send the SMS using the Vonage API
      await vonage.sms.send({ to, from, text });
      console.log('Message sent successfully');
    } catch (err) {
      // Handle errors that occur during SMS sending
      console.log('There was an error sending the message.');
      console.error(err);
    }
  }

  // Log the moisture reading to the console
  console.log(readi.moisture);

  // Check if the moisture level is within a certain range (e.g., between 30 and 45)
  if (readi.moisture >= 30 && readi.moisture <= 45) {
    // If the moisture level is within the specified range, send an SMS
    await sendSMS();
  }

  // Log a message indicating the function runs every 3 minutes
  console.log("This function runs every 3 minutes.");
}


// Define a route for handling the POST request when a user logs in on the dashboard
app.post("/dashboard", async function(req, res) {
  // Extract the email and password from the request body
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Create a reference to the 'users' location in the database
    const usersRef = db.ref("users");

    // Fetch all user data from the database
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();

    // Find a user in the user data with matching email and password
    const foundUser = Object.values(users).find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
      // If a user with the provided email and password is found
      // Fetch sensor data asynchronously
      const readings = await read_sensor();

      // Fetch chart data asynchronously
      const { temperatureArray, humidityArray, moistureArray } = await fetchChartData();

      // Render the "dashboard" view, passing the data to the template
      res.render("dashboard", {
        readings: readings,
        temperature: temperatureArray,
        humidity: humidityArray,
        moisture: moistureArray
      });

      // Log temperature, humidity, and moisture data to the console
      console.log(temperatureArray, humidityArray, moistureArray);
    } else {
      // If no user is found with the provided credentials, send a 401 Unauthorized response
      res.status(401).send("Invalid username or password");
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    
    // Send a 500 Internal Server Error response in case of an error
    res.status(500).send("Internal server error");
  }
});


  // Define a route for handling the POST request when a user submits crop data
app.post("/add_crop.html", function(req, res) {
  // Extract crop data from the request body
  let title = req.body.crops;
  let quantity = req.body.quantity;
  let amount = req.body.price;
  let address = req.body.address;

  try {
      // Create a new crop entry in the database
      const newCropRef = db.ref("crops").push();

      // Get the current date and time
      const currentDate = new Date();
      
      // Calculate the future date by adding 24 hours (86400000 milliseconds) to the current date
      const futureDate = new Date(currentDate.getTime() + 86400000);

      // Set the crop data in the database
      newCropRef.set({
          title: title,
          subtitle: "",
          detail: "",
          quantity: quantity,
          amount: amount,
          address: address,
          endTime: futureDate.toISOString()
      });

      // Log a message to indicate that crop data has been saved to Firebase
      console.log("Crop data saved to Firebase");

      // Send the "add_crop.html" file as a response after the data has been saved
      res.sendFile(__dirname + "/add_crop.html");
  } catch (err) {
      // Handle any errors that occur during the process
      console.log(err);
  }
});
   // Set an interval to call the 'myFunction' function every 3 minutes (3 * 60 * 1000 milliseconds)
  setInterval(myFunction, 3 * 60 * 1000);
  // This code will run 'myFunction' every 3 minutes to perform its tasks.

