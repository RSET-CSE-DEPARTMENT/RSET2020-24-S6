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
  
  // Get a reference to the authentication service
  var auth = firebase.auth();
  
  // Handle resend email button click
  document.getElementById('resendBtn').addEventListener('click', resendEmailVerification);
  
  // Resend email verification
  function resendEmailVerification() {
    var user = auth.currentUser;
  
    user.sendEmailVerification()
      .then(function() {
        alert("Verification email has been resent.");
      })
      .catch(function(error) {
        // Handle error sending email verification
        console.log(error);
      });
  }
  