async function navPicture() {
	try {
		const response = await axios.get("/image");
		const imageElement = document.getElementById("profilePic");

		// Set the Base64 encoded image data as the src attribute of the <img> tag
        if(response.data.image)
		    imageElement.src = "data:image/jpeg;base64," + response.data.image;
	} catch (error) {
		console.error("Error:", error);
	}
}