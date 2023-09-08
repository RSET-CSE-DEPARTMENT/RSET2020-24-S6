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

// Get a reference to the authentication service
var auth = firebase.auth();
// Get a reference to the Realtime Database
var database = firebase.database();

// Handle form submission
document.getElementById('signupForm').addEventListener('submit', signupWithEmail);

function signupWithEmail(e) {
  e.preventDefault();

  // Get form values
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Sign up with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Set user display name
      userCredential.user.updateProfile({
        displayName: name
      })
      .then(function() {
        // Send email verification
        sendEmailVerification();
        // Store user data in the Realtime Database
        saveUserData(userCredential.user.uid, name, email);
      })
      .catch(function(error) {
        // Handle error updating user profile
        console.log(error);
      });
    })
    .catch(function(error) {
      // Handle error creating user
      console.log(error);
    });
}

// Send email verification
function sendEmailVerification() {
  var user = auth.currentUser;

  user.sendEmailVerification()
    .then(function() {
      // Redirect to verification page
      window.location.href = "verification1.html";
    })
    .catch(function(error) {
      // Handle error sending email verification
      console.log(error);
    });
}

// Save user data in the Realtime Database
function saveUserData(userId, name, email) {
  var userData = {
    name: name,
    email: email
  };

  database.ref('Users/' + userId).set(userData)
    .then(function() {
      console.log('User data saved successfully');
    })
    .catch(function(error) {
      console.log('Error saving user data:', error);
    });
}