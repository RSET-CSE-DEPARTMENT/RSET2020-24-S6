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
  
  // Get a reference to the database
  var database = firebase.database();
  
  // Search dogs based on location
  function searchDogs() {
    var location = document.getElementById('searchInput1').value;
    var dogBreed = document.getElementById('searchInput2').value;
  
    // Clear previous results
    document.getElementById('dogsContainer').innerHTML = '';
  
    if (location === "none") {
      alert("Location must be entered!");
    } else {
      // Query the database based on location
      database.ref('dogsforAdoption').orderByChild('location').equalTo(location).once('value', function(snapshot) {
        if (snapshot.exists()) {
          // Dogs found for the specified location
          snapshot.forEach(function(childSnapshot) {
            var dog = childSnapshot.val();
            if (dog.breed === dogBreed || dogBreed === 'none') {
              displayDogCard(dog);
            }
          });
        } else {
          // No dogs found for the specified location
          alert('No dogs found for this location!');
        }
      }); 
    }
  }
    
  // Display dog card
  function displayDogCard(dog) {
    var dogsContainer = document.getElementById('dogsContainer');
  
    var dogCard = document.createElement('div');
    dogCard.className = 'dog-card';
  
    var image = document.createElement('img');
    image.src = dog.image;
    dogCard.appendChild(image);
  
    var name = document.createElement('h3');
    name.textContent = dog.name;
    dogCard.appendChild(name);
  
    var breed = document.createElement('p');
    breed.textContent = 'Breed: ' + dog.breed;
    dogCard.appendChild(breed);
  
    var price = document.createElement('p');
    price.textContent = 'Price: Rs' + dog.price;
    dogCard.appendChild(price);
  
    var age = document.createElement('p');
    age.textContent = 'Age: ' + dog.age;
    dogCard.appendChild(age);

    var gender = document.createElement('p');
    gender.textContent = 'Gender: ' + dog.gender;
    dogCard.appendChild(gender);
  
    var seller = document.createElement('p');
    dog.textContent = 'Seller Name: ' + dog.seller;
    dogCard.appendChild(seller);

    var location = document.createElement('p');
    location.textContent = 'Location: ' + dog.location;
    dogCard.appendChild(location);

    var price = document.createElement('p');
    price.textContent = 'Price: Rs' + dog.price;
    dogCard.appendChild(price);

    var contact = document.createElement('p');
    contact.textContent = 'Contact: ' + dog.contact;
    dogCard.appendChild(contact);
  
    dogsContainer.appendChild(dogCard);
  }
  