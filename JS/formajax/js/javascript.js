/**
 * Form AJAX
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

/**
 * Check input Username (length >= 8)
 */
function checkUsernameLength() {
	var tbUsername = document.getElementsByName("username")[0].value; //value of textbox username
	var errorUsername = document.getElementById("error-username");
	
	if (tbUsername.length < 8) {
		errorUsername.innerHTML = "Username length min 8 letter";
	} else {
		errorUsername.innerHTML = "";
	}
}

/**
 * Check input Password (length >= 8)
 */
function checkPasswordLength() {
	var tbPassword = document.getElementsByName("password")[0].value; //value of textbox password
	var errorPassword = document.getElementById("error-password");
	
	if (tbPassword.length < 8) {
		errorPassword.innerHTML = "Password length min 8 letter";
	} else {
		errorPassword.innerHTML = "";
	}
}

/**
 * Check input Email (format: English, has "@", ".", may has ".", "_", "-" before "@")
 */
function checkEmailFormat() {
	var tbEmail = document.getElementsByName("email")[0].value; //value of textbox email
	var errorEmail = document.getElementById("error-email");
	var REGEX = /^([a-z0-9\._-]+)@([a-z]+)\.([a-z\.]{2,6})$/;
	
	if (!REGEX.test(tbEmail)) {
		errorEmail.innerHTML = "Email wrong format";
	} else {
		errorEmail.innerHTML = "";
	}
}