// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBWEi9gYo0eRJtxRI4-5T-aBk_DZ89tyaY",
  authDomain: "test-75362.firebaseapp.com",
  databaseURL: "https://test-75362-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-75362",
  storageBucket: "test-75362.appspot.com",
  messagingSenderId: "565901038176",
  appId: "1:565901038176:web:343fe9ca2e82be738b6905",
  measurementId: "G-4XPF7F2NGJ"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
var database = firebase.database();

// Get the form elements
var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var form3 = document.getElementById("form3");
var submitButton = document.getElementById("submit");
var imageInput = document.getElementById("image");
var imagePreview = document.getElementById("preview");

// Handle file input change event
imageInput.addEventListener("change", function (event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    imagePreview.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

// Handle form submission
submitButton.onclick = function () {
  // Get dog details from form fields
  var dogName = document.getElementById("dogName").value;
  var dogBreed = document.getElementById("dogBreed").value;
  var dogAge = document.getElementById("dogAge").value;
  var gender = document.getElementById("gender").value;
  var dogSize = document.getElementById("dogSize").value;
  var dogWeight = document.getElementById("dogWeight").value;
  var dogTraining = document.getElementById("dogTraining").value;
  var vaccinations = document.getElementById("vaccinations").value;
  var seller = document.getElementById("seller").value;
  var dogLocation = document.getElementById("dogLocation").value;
  var dogPrice = document.getElementById("dogPrice").value;
  var contact = document.getElementById("contact").value;
  var imageFile = imageInput.files[0];

  // Check if any required fields are empty
  if (
    dogName === "" ||
    dogBreed === "" ||
    dogAge === "" ||
    gender === "" ||
    dogSize === "" ||
    dogWeight === "" ||
    dogTraining === "" ||
    seller === "" ||
    dogLocation === "" ||
    dogPrice === "" ||
    contact === "" ||
    imageFile === undefined
  ) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Create a unique filename for the image
  var timestamp = new Date().getTime();
  var imageName = "dog_image_" + timestamp;

  // Create a storage reference for the image
  var imageRef = storage.ref("dogsforAdoption").child(imageName);

  // Upload the image to Firebase Storage
  var uploadTask = imageRef.put(imageFile);

  // Listen for the upload completion
  uploadTask.on(
    "state_changed",
    null,
    function (error) {
      // Handle upload errors
      alert("Image upload failed:", error);
    },
    function () {
      // Image upload successful, get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        // Create an object with all dog details
        var dogDetails = {
          name: dogName,
          breed: dogBreed,
          age: dogAge,
          gender: gender,
          size: dogSize,
          weight: dogWeight,
          training: dogTraining,
          vaccinations: vaccinations,
          seller: seller,
          location: dogLocation,
          price: dogPrice,
          contact: contact,
          image: downloadURL, // Store the download URL of the image
        };

        // Store the dog details in the Realtime Database
        database.ref("dogsforAdoption").push(dogDetails).then(function () {
          // Dog details successfully stored
          alert("Dog details saved in the database!");
          // Reset the form for the next submission
          form1.reset();
          form2.reset();
          form3.reset();
          // Reset the image preview
          imagePreview.src = "";
        });
      });
    }
  );
};
