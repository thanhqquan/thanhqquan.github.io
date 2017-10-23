<?php
require 'Check_Input.php';

// Find username in database
$sql = "SELECT * FROM user WHERE username = '". $username. "'";
$result = $conn->query($sql);

// Username is existing in Database
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Username ". $row["username"]. " is existing.";
    }
} else {
    // Check input of username, password, email, birthday
    if (checkUsernameLength($username) === false || checkPasswordLength($password) === false || checkEmailFormat($email) === false || checkBirthday($birthday) === false) {
        echo "Your username, password, email or birthday are not correct format.";
    } else {
        // Add record to Database
        $sql_insert = "INSERT INTO user(username,password,email,birthday) VALUES ('". $username. "', '". md5($password). "', '". $email. "', '". $birthday. "');";
        
        if ($conn->query($sql_insert) === true) {
            echo "Username ". $username. " is created successfully.";
        } else {
            echo "Cannot add to Database";
        }
    }
}

mysqli_close($conn);
?>