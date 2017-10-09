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
showCalendar(curYear,curMonth);
showYear();
curTime();

/**
 * Display the Calendar
 * @param {int} year Year from drop-down list
 * @param {int} month Month from drop-down list
 */
function showCalendar( year, month) {
	parseInt(year);
	parseInt(month);
	var firstDate = new Date(year, month - 1, 1).getDay();//the first date of month
	var lastDate = new Date(year, month, 0).getDate();//the last date of month
	var i, day;
	day = 13 + firstDate;
	//
	for (var i = 13; i < 55; i++) {
		cell[i].innerHTML = "";
		cell[i].style.backgroundColor="aqua";
	}
	
	for (var i = 1; i <= lastDate; i++) {
		cell[day].innerHTML = i;
		day ++;
	}
	curTime();
}

//Display month and year into drop-down list Month and Year
function curTime() {
	listMonth.value = curMonth;
	listYear.value = curYear;
}

//Display year in drop-down list with id = "year"(range of year: 1970~2100)
function showYear () {
	var i;
	
	for (i = 1970; i <= 2100; i++) {
		listYear.innerHTML += "<option value='" + i + "'>"+ i +'</option>';
		showCalendar(curYear,curMonth);
	}
}

/**
 * Click on Previous Month (<) or Next Month (>)
 * @param {int} n Ordinal number of a month
 */
function adjacentMonth(n) {
	listMonth.value += n;
	if (curMonth < 0) {
		curMonth = 12;
		curYear -= 1;
	}
	if (curMonth > 12) {
		curMonth = 1;
		curYear += 1;
	}
	showCaledar(curYear,curMonth);
}

/**
 * Click on Previous Year (<<) or Next Month (>>)
 * @param {int} n Ordinal number of a year
 */
 function adjacentYear(n) {
	listYear.value += n;
}