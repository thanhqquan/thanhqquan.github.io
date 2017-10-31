/**
 * Calendar
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */
var TODAY = new Date();
var CUR_DATE = TODAY.getDate(); // current Date
var CUR_MONTH = TODAY.getMonth() + 1; // current Month
var CUR_YEAR = TODAY.getFullYear(); // current Year
var LIST_MONTH = document.getElementById("month"); // month in drop-down list
var LIST_YEAR = document.getElementById("year"); // year in drop-down list
var CELL = document.getElementsByTagName("td"); // cell of table
var PICKED_DAY = document.getElementById("picked-day"); // day is picked (yyyy-mm-dd)
var MINCELL = 13; // td has numerical order is 13
var MAXCELL = 55; // td has numerical order is 55
showCalendar(CUR_YEAR, CUR_MONTH);
showYear(); // show year in drop-down list
pickDate(); // Choose a day, display it with format yyyy/mm/dd
PICKED_DAY.value = CUR_YEAR + "-" + CUR_MONTH + "-" + CUR_DATE; // set default value for picked-day

/**
 * Display the Calendar with Year and Month
 * @param {int} year Year in drop-down list
 * @param {int} month Month in drop-down list
 */
function showCalendar(year, month) {
    var firstDate = new Date(year, month - 1, 1).getDay(); // the first week's day of month
    var lastDate = new Date(year, month, 0).getDate(); // the last date of month
    var day;
    day = MINCELL + firstDate; // index of cell

    // Change color of cells (from MINCELL to MAXCELL) to #2d2d2d, border 1px solid #2d2d2d
    for (var i = MINCELL; i < MAXCELL; i++) {
        CELL[i].innerHTML = "";
        CELL[i].style.backgroundColor = "#2d2d2d";
        CELL[i].style.border = "1px solid #2d2d2d";
    }
    // Add number to cells and change color of cells to white
    for (var i = 1; i <= lastDate; i++) {
        CELL[day].innerHTML = i;
        CELL[day].style.backgroundColor = "white";
        day++;
    }
    curTime();
    // Change color of cell, which is TODAY
    if (CUR_YEAR === TODAY.getFullYear() && CUR_MONTH === (TODAY.getMonth() + 1)) {
        var CUR_DATE = 12 + TODAY.getDate();
        CELL[CUR_DATE].style.backgroundColor = "#00ace6";
    }
}

/**
 * Display current month and current year in drop-down list Month and Year
 */
function curTime() {
    LIST_MONTH.value = CUR_MONTH;
    LIST_YEAR.value = CUR_YEAR;
}

/**
 * Display year in drop-down list has id = "year"(range of year: 1970~2100)
 */
function showYear() {
    for (var i = 1970; i <= 2100; i++) {
        LIST_YEAR.innerHTML += "<option value='" + i + "'>"+ i +'</option>';
    }
    showCalendar(CUR_YEAR, CUR_MONTH);
}

/**
 * Check year less than 1970 or greater than 2100
 */
function checkYear() {
    if (CUR_YEAR > 2100) {
        CUR_YEAR = 2100;
        alert("Year cannot be greater than 2100");
    } else if (CUR_YEAR < 1970) {
        CUR_YEAR = 1970;
        alert("Year cannot be less than 1970");
    }
}

/**
 * Click on Previous Month (<) or Next Month (>)
 * @param {int} n Ordinal number of a month
 */
function adjacentMonth(n) {
    CUR_MONTH += n;
    if (CUR_MONTH < 1) {
        CUR_MONTH = 12;
        CUR_YEAR -= 1;
    } else if (CUR_MONTH > 12) {
        CUR_MONTH = 1;
        CUR_YEAR += 1;
    }
    checkYear();
    showCalendar(CUR_YEAR, CUR_MONTH);
}

/**
 * Click on Previous Year (<<) or Next Year (>>)
 * @param {int} n Ordinal number of a year
 */
function adjacentYear(n) {
    CUR_YEAR += n;
    checkYear();
    showCalendar(CUR_YEAR, CUR_MONTH);
}

/**
 * Choose a month from drop-down list, show all days of that Month and Year from drop-down list
 */
function pickMonth() {
    CUR_MONTH = parseInt(LIST_MONTH.value);
    showCalendar(CUR_YEAR, CUR_MONTH);
}

/**
 * Choose a year from drop-down list, show all days of that Month and Year from drop-down list
 */
function pickYear() {
    CUR_YEAR = parseInt(LIST_YEAR.value);
    showCalendar(CUR_YEAR, CUR_MONTH);
}

/**
 * Choose a day, display it with format yyyy-mm-dd in tag input has id="picked-day"
 */
function pickDate() {
    for (var i = MINCELL; i < MAXCELL; i++) {
        CELL[i].addEventListener("click", function() {
            // Change color of all cells's border to #2d2d2d
            for (var j = MINCELL; j < MAXCELL; j ++) {
                CELL[j].style.border = "1px solid #2d2d2d";
            }
            
            var cellDay = this.innerHTML; // Day of cell is chosen

            if (cellDay != "") {
                this.style.border = "1px solid red";
                PICKED_DAY.value = CUR_YEAR + "-" + CUR_MONTH + "-" + cellDay;
                document.getElementById("table-calendar").style.display = "none"; // Hide Calendar
            } else {
                this.style.border = "1px solid orange";
            }
        });
    }
}