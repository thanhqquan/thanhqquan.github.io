/**
 * Game Monster
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

var SCORE = 0;
var HEART = 5;
var SPEED = 1;
var BOOM = 3;

/**
 * Draw background
 */
window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var bgImg = new Image(); // background image
	bgImg.src = "img/bg01.png";
    context.drawImage(bgImg, 0, 0, canvas.width, canvas.height); // fit image with canvas's width and height
}

/**
 * Monster's information: image of monster, coordinate(x, y), direction point(dirX, dirY), monster is alive
 */
function Monster(img, x, y, dirX, dirY, isAlive) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.dirX = dirX;
	this.dirY = dirY;
}

var position1 = (0,100);
var position2 = (250,350);
var position2 = (500,350);

Monster.prototype.draw = function(context) {
	context.beginPath();
	context
}