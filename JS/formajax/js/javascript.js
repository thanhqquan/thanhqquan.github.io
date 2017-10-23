/**
 * Form AJAX
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

/**
 * Check input Username (8<= length <= 35)
 */
function checkUsernameLength() {
	var tbUsername = document.getElementById("username").value; // value of textbox username
	var errorUsername = document.getElementById("error-username");
	
	if (tbUsername.length == 0) {
		errorUsername.innerHTML = "Please enter username";
		return false;
	} else if (tbUsername.length < 8) {
		errorUsername.innerHTML = "Username length min 8 letter";
		return false;
	} else if (tbUsername.length > 35) {
		errorUsername.innerHTML = "Username length max 35 letter";
		return false;
	} else {
		errorUsername.innerHTML = "";
		return true;
	}
}

/**
 * Check input Password (length >= 8)
 */
function checkPasswordLength() {
	var tbPassword = document.getElementById("password").value; // value of textbox password
	var errorPassword = document.getElementById("error-password");
	
	if (tbPassword == 0) {
		errorPassword.innerHTML = "Please enter password";
		return false;
	} else if (tbPassword.length < 8) {
		errorPassword.innerHTML = "Password length min 8 letter";
		return false;
	} else {
		errorPassword.innerHTML = "";
		return true;
	}
}

/**
 * Check input Email (format: English, has "@", ".", may has ".", "_", "-" before "@")
 */
function checkEmailFormat() {
	var tbEmail = document.getElementById("email").value; // value of textbox email
	var errorEmail = document.getElementById("error-email");
	var REGEX = /^([a-z0-9\._-]+)@([a-z]+)\.([a-z\.]{2,6})$/;
	
	if (tbEmail.length == 0) {
		errorEmail.innerHTML = "Please enter email";
		return false;
	} else if (!REGEX.test(tbEmail)) {
		errorEmail.innerHTML = "Email wrong format";
		return false;
	} else {
		errorEmail.innerHTML = "";
		return true;
	}
}

/**
 * Check input Birthday (birthday <= now)
 */
function checkBirthdayFormat() {
	var tbBirthday = document.getElementById("picked-day").value; // value of birthday
	var myDate = new Date(tbBirthday);
	var now = new Date();
	var calendar = document.getElementById("table-calendar");
	calendar.style.display = "none";
	var errorBirthday = document.getElementById("error-birthday"); 
	
	if (myDate > now) {
		errorBirthday.innerHTML = "Birthday must be on or before today";
		return false;
	} else {
		errorBirthday.innerHTML = "";
		return true;
	}
}

/**
 * Display calendar when clicked on textbox picked-day
 */
function presentCalendar() {
	var calendar = document.getElementById("table-calendar");
	calendar.style.display = "block";
}

/**
 * Validate information before submit to server 
 */
function submitForm() {
	var xhttp; // XMLHttpRequest
	document.getElementById("status").innerHTML = ""; // status clear when clicked button "SUBMIT"
	var tbUsername = document.getElementById("username").value;
	var tbPassword = document.getElementById("password").value;
	var tbEmail = document.getElementById("email").value;
	var tbBirthday = document.getElementById("picked-day").value;
	var data = "username=" + tbUsername + "&password=" + tbPassword + "&email=" + tbEmail + "&birthday=" + tbBirthday;
	
	if (checkUsernameLength() && checkPasswordLength() && checkEmailFormat() && checkBirthdayFormat()) {
		if (window.XMLHttpRequest) {
			// code for modern browsers
			xhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("status").innerHTML = xhttp.responseText;
			}
		};
		
		// Send data to Add_Db.php
		xhttp.open("POST", "Add_Db.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		document.getElementById("status").innerHTML = "Processing..."; // status when form sending to server
		xhttp.send(data);
	} else { return false; }
}