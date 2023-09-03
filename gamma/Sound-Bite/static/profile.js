// Your existing code remains the same
var userInput = document.getElementById("userInput");
var passwordGroup = document.getElementsByClassName("passwordGroup");
var oldPassword = document.getElementById("oldPassword");
var newPassword = document.getElementById("newPassword");

var editButton = document.getElementById("editButton");
var saveButton = document.getElementById("saveButton");
var cancelButton = document.getElementById("cancelButton");

userInput.readOnly = true;
passwordGroup[0].style.display = "none"; // Initially hide the password fields

// Variable to store the initial username value
var initialUsername;

function editDetails() {
	userInput.readOnly = false;
	passwordGroup[0].style.display = "flex";
	editButton.style.display = "none";
	saveButton.style.display = "";
	cancelButton.style.display = "";
}

function cancelEditDetails() {
	// Restore the initial username value
	userInput.value = initialUsername;
	userInput.readOnly = true;
	passwordGroup[0].style.display = "none";
	editButton.style.display = "";
	saveButton.style.display = "none";
	cancelButton.style.display = "none";
	oldPassword.value = ""; // Clear old password field when canceling
	newPassword.value = ""; // Clear new password field when canceling
}

async function saveDetails() {
	const username = userInput.value.trim();
	const oldPasswordValue = oldPassword.value.trim();
	const newPasswordValue = newPassword.value.trim();

	if (username.length < 5) {
		alert("Username must be at least 5 characters long.");
		return;
	}

	if (newPasswordValue.length > 0 && newPasswordValue.length < 5) {
		alert("New password must be at least 5 characters long.");
		return;
	}

	try {
		const requestData = {
			username: username,
			oldPassword: oldPasswordValue,
		};

		if (newPasswordValue.length > 0) {
			requestData.newPassword = newPasswordValue;
		}

		const response = await axios.post("/profile/api", requestData);

		// If the server returns success
		if (response.data.success) {
			userInput.readOnly = true;
			oldPassword.value = "";
			newPassword.value = "";
			passwordGroup[0].style.display = "none";
			editButton.style.display = "";
			saveButton.style.display = "none";
			cancelButton.style.display = "none";
			// Optionally, you can update the initialUsername variable as well
			initialUsername = username;
			location.reload();
		} else {
			alert(response.data.error);
		}
	} catch (error) {
		console.error("Error occurred during the POST request:", error);
	}
}

async function getProfile() {
	try {
		const response = await axios.get("/profile/api"); // Replace with the appropriate API endpoint for fetching user details

		if (response.data.success) {
			initialUsername = response.data.username;
			// Set the username and email fields with the fetched data
			userInput.value = initialUsername;
			// Assuming the email field has an ID of "emailInput", set its value as well
			document.getElementById("emailInput").value = response.data.email;
			fetchProfilePicture();
		} else {
			alert("Failed to fetch user data. Please try again.");
		}
	} catch (error) {
		console.error("Error occurred during the GET request:", error);
	}
}

async function uploadImage() {
	const fileInput = document.getElementById("uploadImg");
	const file = fileInput.files[0];

	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await axios.post("/image", formData);
		console.log(response.data); // You can handle the response here
		location.reload();
	} catch (error) {
		console.error("Error:", error);
	}
}

async function fetchProfilePicture() {
	try {
		const response = await axios.get("/image");
		const imageElement = document.getElementById("profilePicture");

		// Set the Base64 encoded image data as the src attribute of the <img> tag
        if(response.data.image)
		    imageElement.src = "data:image/jpeg;base64," + response.data.image;
	} catch (error) {
		console.error("Error:", error);
	}
}
