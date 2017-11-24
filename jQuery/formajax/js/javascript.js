/**
 * Form AJAX - jQuery
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

/*
 Check input Username (8 <= length <= 35)
 */
$($("#username").change(function() {
    checkUsernameLength();
}));

function checkUsernameLength() {
    var tbUsername = $("#username").val(); // value of textbox username
    var errorUsername =  $("#error-username");

    if (tbUsername.length == 0) {
        errorUsername.html("Please enter username");
        return false;
    } else if (tbUsername.length < 8) {
        errorUsername.html("Username length min 8 letter");
        return false;
    } else if (tbUsername.length > 35) {
        errorUsername.html("Username length max 35 letter");
        return false;
    } else {
        errorUsername.html("");
        return true;
    }
}

/*
 Check input Password (length >= 8)
 */
$($("#password").change(function() {
    checkPasswordLength();
}));

function checkPasswordLength() {
    var tbPassword = $("#password").val(); // value of textbox password
    var errorPassword = $("#error-password");

    if (tbPassword == 0) {
        errorPassword.html("Please enter password");
        return false;
    } else if (tbPassword.length < 8) {
        errorPassword.html("Password length min 8 letter");
        return false;
    } else {
        errorPassword.html("");
        return true;
    }
}

/*
 Check input Email (format: English, has "@", ".", may has ".", "_", "-" before "@")
 */
$($("#email").change(function() {
    checkEmailFormat();
}));

function checkEmailFormat() {
    var tbEmail = $("#email").val(); // value of textbox email
    var errorEmail = $("#error-email");
    var REGEX = /^([a-z0-9\._-]+)@([a-z]+)\.([a-z\.]{2,6})$/;

    if (tbEmail.length == 0) {
        errorEmail.html("Please enter email");
        return false;
    } else if (!REGEX.test(tbEmail)) {
        errorEmail.html("Email wrong format");
        return false;
    } else {
        errorEmail.html("");
        return true;
    }
}

/*
 Check input Birthday (valid: birthday <= now)
 */
$($("#picked-day").change(function() {
    checkBirthdayFormat();
}));

function checkBirthdayFormat() {
    var tbBirthday = $("#picked-day").val(); // value of birthday
    var myDate = new Date(tbBirthday);
    var now = new Date();
    var calendar = $("#table-calendar");
    calendar.css("display", "none");
    var errorBirthday = $("#error-birthday");

    if (myDate > now) {
        errorBirthday.html("Birthday must be on or before today");
        return false;
    } else {
        errorBirthday.html("");
        return true;
    }
}

/*
 Display calendar when clicked on textbox picked-day
 */
$(function() {
    $("#picked-day").on("click", function() {
        $("#table-calendar").css("display", "block");
    });
});

/*
 Validate information before submit to server 
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