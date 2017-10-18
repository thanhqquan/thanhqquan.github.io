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
    if (!preg_match("/^([a-z0-9\._-]+)@([a-z]+)\.([a-z\.]{2,6})$/", $email)) {
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
?>