<?php
// Replace 'your_database_name', 'your_username', 'your_password', and 'your_table_name' with your actual database details
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "products";
$table_name = "product";

// Create a connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the identified plant name from the query parameter
$identifiedPlant = $_GET['name'];

// Query to get the plant from the table based on the identified plant name
$sql = "SELECT * FROM product WHERE name = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $identifiedPlant);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Convert the result to an associative array
    $row = $result->fetch_assoc();
    // Close the database connection
    $conn->close();
    // Return the plant information as JSON response
    header("Content-Type: application/json");
    echo json_encode($row);
} else {
    // No plant found
    // Close the database connection
    $conn->close();
    // Return an empty JSON response
    header("Content-Type: application/json");
    echo json_encode(null);
}
?>
