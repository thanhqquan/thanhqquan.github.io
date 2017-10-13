<?php
	//Define variables and set to empty values;
	$username = $_POST["username"];
	$password = $_POST["password"];
	$email = $_POST["email"];
	//$birthday = $_POST["birthday"];
	$dbUsername = "thanhquan";
	$dbEmail = "abc@gmail.com";
	
	//Check existence of username
	if (strcmp($username,$dbUsername) == 0) {
		echo "Username is existing";
	}
	
	//Check existence of email
	if (strcmp($email,$dbEmail) == 0) {
		echo "Email is existing";
	}
?>