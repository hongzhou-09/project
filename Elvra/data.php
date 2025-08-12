<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "sneakerstore";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
$name = $_POST['name'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$card_number = $_POST['card_number'];
$expiry_month = $_POST['expiry_month'];
$expiry_year = $_POST['expiry_year'];
$cvv = $_POST['cvv'];

// Insert data into database
$sql = "INSERT INTO payments (name, phone, address, card_number, expiry_month, expiry_year, cvv)
        VALUES ('$name', '$phone', '$address', '$card_number', '$expiry_month', '$expiry_year', '$cvv')";

// Execute the query and check for success
if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Checkout complete');</script>";
    echo "<script>window.setTimeout(function(){ window.location.href = 'index.html'; }, 1000);</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>