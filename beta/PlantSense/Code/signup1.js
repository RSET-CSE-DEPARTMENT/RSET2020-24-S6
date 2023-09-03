const firebaseConfig = {
  apiKey: "AIzaSyBtDRHLR40eanOlVSS2BVcufrrBNGyiEVs",
  authDomain: "plantidentification-24d88.firebaseapp.com",
  databaseURL: "https://plantidentification-24d88-default-rtdb.firebaseio.com",
  projectId: "plantidentification-24d88",
  storageBucket: "plantidentification-24d88.appspot.com",
  messagingSenderId: "370160667478",
  appId: "1:370160667478:web:60dd8622edd9526f6824f7"
};
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var database = firebase.database();
  document.getElementById('signupForm').addEventListener('submit', signupWithEmail);
  function signupWithEmail(e) {
    e.preventDefault();
  
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Set user display name
      userCredential.user.updateProfile({
        displayName: name
      })
      .then(function() {
        var userData = {
            name: name,
            email: email,
            password: password
          };
          database.ref('PlantUsers').push(userData)
          .then(function() {
            alert('User data saved successfully');
            window.location.href = 'plt.html';
          })
          .catch(function(error) {
            alert('Error saving user data');
          });
      })
      .catch(function(error) {
        // Handle error updating user profile
        console.log(error);
      })
    })
    .catch(function(error) {
      // Handle error creating user
      console.log(error);
    });
}