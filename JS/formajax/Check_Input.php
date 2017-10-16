<?php
	require 'Connect_Db.php';
	$username = $_POST["username"];
	$password = $_POST["password"];
	$email = $_POST["email"];
	$birthday = $_POST["birthday"];
	
	/**
	 * Check input Username (8<= length <= 35)
	 * @param (username)
	 */
	function checkUsernameLength($username) {
		if ((strlen($username) < 8) && (strlen($username) > 35)) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Check input Password (length >= 8)
	 * @param (password)
	 */
	function checkPasswordLength($password) {
		if (strlen($password) < 8) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Check input Email (format: English, has "@", ".", may has ".", "_", "-" before "@")
	 * @param (email)
	 */
	function checkEmailFormat($email) {
		if (!preg_match("/^([a-z0-9\._-]+)@([a-z]+)\.([a-z\.]{2,6})$/",$email)) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Check input Birthday
	 * @param (birthday)
	 */
	function checkBirthday($birthday) {
		if (!isset($birthday)) {
			return false;
		} else {
			return true;
		}
	}
	
	// Find username in database
	$sql = "SELECT * FROM user WHERE username = '". $username. "'";
	$result = $conn -> query($sql);
	
	if ($result -> num_rows > 0) {
		// Username is existing in Database
		while ($row = $result-> fetch_assoc()) {
			echo "Username ". $row["username"]. " is existing.<br><a href='index.html'>Create another account</a>";
		}
	} else {
		// Check input of username, password, email
		if (checkUsernameLength($username) === false || checkPasswordLength($password) === false || checkEmailFormat($email) === false || checkBirthday($birthday) === false) {
			echo "Your username, password or email are not correct format.<br><a href='index.html'>Create another account</a>";
			return true;
		}
		else {
			// Add record to Database, md5 password
			$sql = "INSERT INTO user(username,password,email,birthday) VALUES ('". $username. "', '". md5($password). "', '". $email. "', '". $birthday. "');";
			
			if ($conn -> query($sql) === true) {
				echo "Username ". $username. " is created successfully";
			} else {
				echo "Cannot add to Database";
			}
			return false;
		}
	}
	mysqli_close($conn);
?>