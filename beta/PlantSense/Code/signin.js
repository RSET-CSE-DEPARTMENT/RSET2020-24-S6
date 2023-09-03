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
  function signinWithEmail(event) {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign in successful, you can do something here
        const user = userCredential.user;
        console.log('User signed in:', user);
        alert('Login successful');
        window.location.href = 'plt.html';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign in error:', errorMessage);
        alert('Invalid username or password')
      });
  }
  document.getElementById('signinForm').addEventListener('submit', signinWithEmail);
