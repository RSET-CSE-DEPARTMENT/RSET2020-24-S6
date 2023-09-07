// $(document).ready(function() {
//     $('#editAllergiesBtn').on('click', function() {
//         $('#allergiesText').addClass('d-none');
//         $('#allergiesInput').removeClass('d-none').val($('#allergiesText').text());
//         $(this).addClass('d-none');
//         $('#saveAllergiesBtn').removeClass('d-none');
//     });

//     $('#saveAllergiesBtn').on('click', function() {
//         var allergies = $('#allergiesInput').val();
//         $('#allergiesText').text(allergies).removeClass('d-none');
//         $('#allergiesInput').addClass('d-none');
//         $(this).addClass('d-none');
//         $('#editAllergiesBtn').removeClass('d-none');
//     });
// });

$(document).ready(function() {
    $('#editAllergiesBtn').on('click', function() {
      $('#allergiesText').addClass('d-none');
      $('#allergiesInput').removeClass('d-none').val($('#allergiesText').text());
      $(this).addClass('d-none');
      $('#saveAllergiesBtn').removeClass('d-none');
    });
  
    $('#saveAllergiesBtn').on('click', function() {
      var allergies = $('#allergiesInput').val();
      $('#allergiesText').text(allergies).removeClass('d-none');
      $('#allergiesInput').addClass('d-none');
      $(this).addClass('d-none');
      $('#editAllergiesBtn').removeClass('d-none');
      
      // Make an AJAX request to send the allergies to the Flask app
      fetch('/save_allergies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ allergies: allergies })
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the Flask app
          console.log('Response from Flask:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });

    $('#editCuisineP').on('click', function() {
      $('#cuisineText').addClass('d-none');
      $('#cuisineInput').removeClass('d-none').val($('#cuisineText').text());
      $(this).addClass('d-none');
      $('#saveCuisineP').removeClass('d-none');
    });

    $('#saveCuisineP').on('click', function() {
      var preferences = $('#cuisineInput').val();
      $('#cuisineText').text(preferences).removeClass('d-none');
      $('#cuisineInput').addClass('d-none');
      $(this).addClass('d-none');
      $('#editCuisineP').removeClass('d-none');
      
      // Make an AJAX request to send the allergies to the Flask app
      fetch('/cuisinepreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences: preferences })
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the Flask app
          console.log('Response from Flask:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });

  });
  
