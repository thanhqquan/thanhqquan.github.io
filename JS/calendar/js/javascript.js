/**
 * Calendar
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */
var today = new Date();
var curDate = today.getDate(); //current Date
var curMonth = today.getMonth() + 1; //current Month
var curYear = today.getFullYear(); //current Year
var listMonth = document.getElementById("month"); //month in drop-down list
var listYear = document.getElementById("year"); //year in drop-down list
var cell = document.getElementsByTagName("td"); //cell of table
var pickedDay = document.getElementById("picked-day"); //day is picked (dd/mm/yyyy)
pickedDay.value = "dd/mm/yyyy";
showCalendar(curYear, curMonth);
showYear(); //show year in drop-down list
pickDate();

/**
 * Display the Calendar with Year and Month
 * @param {int} year Year in drop-down list
 * @param {int} month Month in drop-down list
 */
function showCalendar(year, month) {
	var firstDate = new Date(year, month - 1, 1).getDay();//the first date of month
	var lastDate = new Date(year, month, 0).getDate();//the last date of month
	var day;
	day = 13 + firstDate;
	
	//Change color of cells (from 13 to 54) to #2d2d2d, border 1px solid white
	for (var i = 13; i < 55; i++) {
		cell[i].innerHTML = "";
		cell[i].style.backgroundColor = "#2d2d2d";
		cell[i].style.border = "1px solid white";
	}
	//Add number to cells and change color of cells to white
	for (var i = 1; i <= lastDate; i++) {
		cell[day].innerHTML = i;
		cell[day].style.backgroundColor = "white";
		day++;
	}
	curTime();
	//Change color of cell, which is today
	if (curYear === today.getFullYear() && curMonth === (today.getMonth() + 1)) {
		var curDate = 12 + today.getDate();
		cell[curDate].style.backgroundColor = "#00ace6";
	}	
}

/**
 * Display current month and current year in drop-down list Month and Year
 */
function curTime() {
	listMonth.value = curMonth;
	listYear.value = curYear;
}

/**
 * Display year in drop-down list has id = "year"(range of year: 1970~2100)
 */
function showYear() {
	for (var i = 1970; i <= 2100; i++) {
		listYear.innerHTML += "<option value='" + i + "'>"+ i +'</option>';
	}
	showCalendar(curYear, curMonth);
}

/**
 * Check year less than 1970 or greater than 2100
 */
 function checkYear() {
	if (curYear > 2100)	{
		curYear = 2100;
		alert("Year cannot be greater than 2100");
	} else if (curYear < 1970) {
		curYear = 1970;
		alert("Year cannot be less than 1970");
	}
 }

/**
 * Click on Previous Month (<) or Next Month (>)
 * @param {int} n Ordinal number of a month
 */
function adjacentMonth(n) {
	curMonth += n;
	if (curMonth < 1) {
		curMonth = 12;
		curYear -= 1;
	} else if (curMonth > 12) {
		curMonth = 1;
		curYear += 1;
	}
	checkYear();
	showCalendar(curYear, curMonth);
}

/**
 * Click on Previous Year (<<) or Next Year (>>)
 * @param {int} n Ordinal number of a year
 */
function adjacentYear(n) {
	curYear += n;
	checkYear();
	showCalendar(curYear, curMonth);
}

/**
 * Choose a month from drop-down list, show all days of that Month and Year from drop-down list
 */
function pickMonth() {
	curMonth = parseInt(listMonth.value);
	showCalendar(curYear, curMonth);
}

/**
 * Choose a year from drop-down list, show all days of that Month and Year from drop-down list
 */
function pickYear() {
	curYear = parseInt(listYear.value);
	showCalendar(curYear, curMonth);
}

/**
 * Choose a day, display it with format dd/mm/yyyy in tag input has id="picked-day"
 */
function pickDate() {
	for (var i = 13; i < 55; i++) {
		cell[i].addEventListener("click", function() {
			for (var j = 13; j < 55; j ++) {
				cell[j].style.border = "1px solid white";
			}
			
			var cellDay = this.innerHTML; //Day of cell is chosen
			if (cellDay != "") {
				this.style.border = "1px solid red";
				pickedDay.value = cellDay + "/" + (curMonth) + "/" + curYear;
			}
			else {
				this.style.border = "1px solid orange";
			}
		});
	}
}

