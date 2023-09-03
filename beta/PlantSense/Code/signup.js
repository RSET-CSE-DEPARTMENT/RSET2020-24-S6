const firebaseConfig = {
  apiKey: "AIzaSyBtDRHLR40eanOlVSS2BVcufrrBNGyiEVs",
  authDomain: "plantidentification-24d88.firebaseapp.com",
  databaseURL: "https://plantidentification-24d88-default-rtdb.firebaseio.com",
  projectId: "plantidentification-24d88",
  storageBucket: "plantidentification-24d88.appspot.com",
  messagingSenderId: "370160667478",
  appId: "1:370160667478:web:60dd8622edd9526f6824f7"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the "users" collection in the Firebase database
  const usersRef = firebase.database().ref("Plantusers");
  
  // Function to handle the form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get the form inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("checkbox").checked;
  
    // Validate the inputs (you may add more validation logic here)
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Create a new user object
    const newUser = {
      name: name,
      email: email,
      password: password,
      rememberMe: rememberMe
    };
  
    // Push the new user object to the "users" collection in the database
    usersRef.push(newUser)
      .then(() => {
        alert("Registration successful!");
        // Optionally, you can redirect the user to another page after successful registration
        window.location.href = "signin.html";
      })
      .catch((error) => {
        alert("Error occurred during registration");
      });
  }
  
  // Add an event listener to the "Register" button
  const registerBtn = document.getElementById("btn-submit");
  registerBtn.addEventListener("click", handleFormSubmit);
  