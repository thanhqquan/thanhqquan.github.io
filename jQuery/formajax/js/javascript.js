/**
 * Form AJAX - jQuery
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */
var USERNAME = $("#username");
/*
 * Check input Username (8 <= length <= 35)
 */
$(USERNAME).change(function() {
    checkUsernameLength();
});

// $('input[name=username]').change(function(){
    // checkUsernameLength();
// });

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
 * Check input Password (length >= 8)
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

/*
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

/*
 * Display calendar when clicked on textbox picked-day
 */
$(function() {
    $("#picked-day").on("click", function() {
        $("#table-calendar").css("display", "block");
    });
});