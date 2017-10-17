<?php
$servername = "localhost";
$username = "id3290057_thanhquan";
$password = "hntq123456";
$database = "id3290057_formajax";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>