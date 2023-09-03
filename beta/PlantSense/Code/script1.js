//script.js

// API endpoint and parameters
const apiUrl = 'https://api.plant.id/v2/identify';
const apiKey = 'Add your Plant.id API key here';


// Function to identify a plant
async function identifyPlant(imageUrl) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
      },
      body: JSON.stringify({
        images: [imageUrl],
        organs: ['flower', 'leaf'],
      }),
    });


    if (!response.ok) {
      throw new Error('Failed to identify plant');
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var submitBtn = document.getElementById('submit-btn');
  var captureBtn = document.getElementById('capture-btn');
  var imageUpload = document.getElementById('image-upload');
  var resultContainer = document.getElementById('result-container');
  var result = document.getElementById('result');
  var video = document.getElementById('video');


  // Get user media (camera) for capturing photo
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(error) {
        console.log('Error accessing camera:', error);
      });
  }


  captureBtn.addEventListener('click', function() {
    // Access the video element
    var videoElement = document.getElementById("video");


    // Capture a frame from the camera stream when the user clicks the "Take Photo" button
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);


    // Get the captured image data from the canvas
    var imageData = canvas.toDataURL("image/jpeg");

    const species="";

    // Call the identifyPlant function to identify the captured plant
    identifyPlant(imageData)
      .then(function(data) {
        // Process the identification results
        console.log(data);
        // Access specific information about the plant
        species = data.suggestions[0].plant_name;
        console.log('Identified species:', species);


        // Display the identification result
        result.innerText = 'Identified species: ' + species;
        resultContainer.style.display = 'block';
      })
      .catch(function(error) {
        console.error('Plant identification error:', error);
      });
  });


  captureBtn.addEventListener('click', function() {
    // Access the video element
    var videoElement = document.getElementById("video");

    // Capture a frame from the camera stream when the user clicks the "Take Photo" button
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Get the captured image data from the canvas
    var imageData = canvas.toDataURL("image/jpeg");

    // Call the identifyPlant function to identify the captured plant
    identifyPlant(imageData)
      .then(function(data) {
        // Process the identification results
        console.log(data);
        // Access specific information about the plant
        species = data.suggestions[0].plant_name;
        console.log('Identified species:', species);

        // Display the identification result
        result.innerText = 'Identified species: ' + species;
        resultContainer.style.display = 'block';
      })
      .catch(function(error) {
        console.error('Plant identification error:', error);
      });
  });

  submitBtn.addEventListener('click', function() {
    var file = imageUpload.files[0];
    var formData = new FormData();
    formData.append('image', file);


    // Read the file and convert it to a data URL
    var reader = new FileReader();
    reader.onload = function(e) {
      var imageData = e.target.result;


      // Call the identifyPlant function to identify the uploaded plant image
      identifyPlant(imageData)
        .then(function(data) {
          // Process the identification results
          console.log(data);
          // Access specific information about the plant
          species = data.suggestions[0].plant_name;
          console.log('Identified species:', species);


          // Display the identification result
          //result.innerText = 'Identified species: ' + species;
          //resultContainer.style.display = 'block';
          result.innerText = 'Identified species: ' + species;
          result.style.fontFamily = 'Arial, sans-serif'; // Change the font family
          result.style.fontSize = '25px'; // Change the font size
          resultContainer.style.display = 'block';


        })
        .catch(function(error) {
          console.error('Plant identification error:', error);
        });
    };
    reader.readAsDataURL(file);
  });
});

//species="Aloe vera"

function getPlant(identifiedPlant) {
  // Redirect to the "getd.html" web page and pass the identifiedPlant as a query parameter
  window.location.href = 'getd.html?plant=' + encodeURIComponent(species);
}

  
function viewMedicines(identifiedPlant) {
  // Redirect to the "medicines.html" web page and pass the identifiedPlant as a query parameter
  window.location.href = 'medicines.html?plant=' + encodeURIComponent(species);
}
