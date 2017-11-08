/**
 * Calendar - jQuery
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

var TODAY = new Date();
var CUR_DATE = TODAY.getDate();
var CUR_MONTH = TODAY.getMonth() + 1;
var CUR_YEAR = TODAY.getFullYear();
const MINCELL = 13;
const MAXCELL = 55;
var PICKED_DAY_VAL = CUR_YEAR + "-" + CUR_MONTH + "-" + CUR_DATE;

/*
 Display the Calendar
*/
$(function() {
    showCalendar(CUR_YEAR, CUR_MONTH); 
    showYear();
    $("#picked-day").val(PICKED_DAY_VAL);
});

/*
 Display the Calendar with year and month
*/
function showCalendar(year, month) {
    var firstDate = new Date(year, month - 1, 1).getDay(); // the first week's day of month
    var lastDate = new Date(year, month, 0).getDate(); // the last date of month
    var day;
    day = MINCELL + firstDate; // index of cell
    
    // Change color of cells
    for (var i = MINCELL; i < MAXCELL; i++) {
        $("td:eq(" + i + ")").html("");
        $("td:eq(" + i + ")").css("backgroundColor", "");
        // $("td:eq(" + i + ")").removeAttr("backgroundColor");
        $("td:eq(" + i + ")").css("border", "2d2d2d");
    }
    
    // Add number to cells and change color of cells to white
    for (var i = 1; i <= lastDate; i++) {
        $("td:eq(" + day + ")").html(i);
        $("td:eq(" + day + ")").css("backgroundColor", "white");
        day++;
    }
    
    // Change color of cell, which is TODAY
    if (CUR_YEAR === TODAY.getFullYear() && CUR_MONTH === (TODAY.getMonth() + 1)) {
        var CUR_DAY = (day - 1) + TODAY.getDate() - lastDate;
        $("td:eq(" + (CUR_DAY) + ")").css("backgroundColor", "#00ace6");
    }
    
    curTime();
}

/*
 Display current month and current year in drop-list month and year
*/
function curTime() {
    $("#month").val(CUR_MONTH);
    $("#year").val(CUR_YEAR);
}

/*
 Display year in drop-down list
*/
function showYear() {
    for (var i = 1970; i <= 2100; i++) {
        $("#year").append("<option value='" + i + "'>" + i + "</option>");
    }
    showCalendar(CUR_YEAR, CUR_MONTH);
}

/*
 Check year less than 1970 or greater than 2100
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

/*
 Check month less than 1 or greater than 12
*/
function checkMonth() {
    if (CUR_MONTH < 1) {
        CUR_MONTH = 12;
        CUR_YEAR -= 1;
    } else if (CUR_MONTH > 12) {
        CUR_MONTH = 1;
        CUR_YEAR += 1;
    }
}

/*
 Click button previous month
*/
$(function() {
    $(".month:eq(0)").click(function() {
        CUR_MONTH -= 1;
        checkMonth();
        checkYear();
        showCalendar(CUR_YEAR, CUR_MONTH);
    });
});

/*
 Click button next month
*/
$(function() {
    $(".month:eq(1)").click(function() {
        CUR_MONTH += 1;
        checkMonth();
        checkYear();
        showCalendar(CUR_YEAR, CUR_MONTH);
    });
});

/*
 Click button previous year
*/
$(function() {
    $(".year:eq(0)").click(function() {
        CUR_YEAR -= 1;
        checkYear();
        showCalendar(CUR_YEAR, CUR_MONTH);
    });
});

/*
 Click button next year
*/
$(function() {
    $(".year:eq(1)").click(function() {
        CUR_YEAR += 1;
        checkYear();
        showCalendar(CUR_YEAR, CUR_MONTH);
    });
});

/*
 Choose a month from drop-down list, show all days of that Month and Year from drop-down list
*/
$($("#month").change(function() {
    CUR_MONTH = $("#month").val();
    showCalendar(CUR_YEAR, CUR_MONTH);
}));

/*
 Choose a year from drop-down list, show all days of that Month and Year from drop-down list
*/
$($("#year").change(function() {
    CUR_YEAR = $("#year").val();
    showCalendar(CUR_YEAR, CUR_MONTH);
}));

/*
 Choose a day, display it with format yyyy-mm-dd in tag input has id="picked-day"
*/
$(function() {
   for (var i = MINCELL; i < MAXCELL; i++) {
       $("td:eq(" + i + ")").on("click", function() {
           for (var j = MINCELL; j < MAXCELL; j++) {
               $("td:eq(" + j + ")").css("border", "");
           }
           
           var cellDay = $(this).html();
           
           if (cellDay !== "") {
               $(this).css("border", "1px solid red");
               PICKED_DAY_VAL = CUR_YEAR + "-" + CUR_MONTH + "-" + cellDay;
               
               showCalendar(CUR_YEAR, CUR_MONTH);
           } else {
               $(this).css("border", "1px solid orange");
           }
       });
   } 
});