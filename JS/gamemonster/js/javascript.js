/**
 * Game Monster
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

var reqAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
const BTN_SIZE = 50;
const MON_SIZE = 50;
var SCORE = 0;
var HEART = 5;
var SPEED = 1;
var BOOM = 3;
var speedX = 2;
var speedY = 2;

/**
 * Draw background
 */
//Map (width: 500, height: 500) is under Menu (width: 500, height: 100)
const MENU_HEIGHT = 100;
var CANVAS = document.getElementById("canvas");
CANVAS.width = 500;
MAP_W = CANVAS.width;
CANVAS.height = 500 + MENU_HEIGHT;
MAP_H = CANVAS.height;
var HALF_MAP_W = MAP_W / 2 - (MON_SIZE / 2);
var HALF_MAP_H = MAP_H / 2 + (MON_SIZE / 2);
var context = CANVAS.getContext("2d");
var BG_IMG = new Image(); // background image
BG_IMG.src = "img/bg01.png";
var BTN_BOOM = new Image(); 
BTN_BOOM.src = "img/icon_boom.png";
var BTN_PAUSE = new Image();
BTN_PAUSE.src = "img/icon_pause.png";
var BTN_RESTART = new Image();
BTN_RESTART.src = "img/icon_restart.png";

var monImg = [];
var monMaxNum = 9; // Monster's maximum number
for (var i = 0; i<= (monMaxNum - 1); i++) {
	monImg[i] = new Image();
	monImg[i].src = "img/monster" + (i + 1) + ".png";
}
/**
 * Monster's information: image of monster, coordinate(cx, cy), direction point(dirX, dirY), monster is alive
 */
function monster(img, x, y, dirX, dirY, isAlive) {
	this.img = img;
	this.x = x;
	this.x = y;
	this.dirX = dirX;
	this.dirY = dirY;
	this.isAlive = isAlive;
}

/**
 * Position monster can run from
 */
function startPosition(x,y) {
	this.x = x;
	this.y = y;
}

// Start position of monster
var position = [];
position[0] = new startPosition(0, MENU_HEIGHT); // left top
position[1] = new startPosition(HALF_MAP_W, MENU_HEIGHT); // middle top
position[2] = new startPosition(MAP_W - MON_SIZE, MENU_HEIGHT); // right top
position[3] = new startPosition(0, HALF_MAP_H); // left middle
position[4] = new startPosition(HALF_MAP_W, HALF_MAP_H); // center
position[5] = new startPosition(MAP_W - MON_SIZE, HALF_MAP_H); // right middle
position[6] = new startPosition(0, MAP_H - MON_SIZE); // left bottom
position[7] = new startPosition(HALF_MAP_W,MAP_H - MON_SIZE); // middle bottom
position[8] = new startPosition(MAP_W - MON_SIZE,MAP_H - MON_SIZE); // right bottom

var monster = [];
/**
 * Load Game
 */
function loadGame() {
	drawForm();
	drawMonster();
	//monster.move();
	//reqAnimation(loadGame);
}

/**
 * Draw monster: random image and position
 */
function drawMonster() {
	var iImg = Math.floor(Math.random() * monImg.length); // random image's index
	var iPos = Math.floor(Math.random() * position.length); // random position's index
	
	var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[4].x, position[4].y, 1);
	monsters.push(mon);
	// context.drawImage(monImg[iImg], position[iPos].x, position[iPos].y, MON_SIZE, MON_SIZE);
	context.drawImage(monsters[0].img, monsters[0].x, monsters[0].y, MON_SIZE, MON_SIZE);
	// context.drawImage(monsters[0].img, monsters[0].x, monsters[0].y, MON_SIZE, MON_SIZE);
	// monsters[0].move();
}

/**
 * Display Background, Score, Heart, Speed, icons
 */
function drawForm() {
	context.drawImage(BG_IMG, 0, 0, MAP_W, MAP_H); // fit image with canvas's width and height
	context.drawImage(BTN_BOOM, HALF_MAP_W, 10, BTN_SIZE, BTN_SIZE);
	context.drawImage(BTN_PAUSE, HALF_MAP_W + BTN_SIZE + 10, 10, BTN_SIZE, BTN_SIZE);
	context.drawImage(BTN_RESTART, HALF_MAP_W + BTN_SIZE * 2 + 20, 10, BTN_SIZE, BTN_SIZE);
	context.font = "12px Arial";
	context.fillText("Score: " + SCORE, 10, 30);
	context.fillText("Heart: " + HEART, 10, 50);
	context.fillText("Speed: " + SPEED, 10, 70);
	
	for (var i = 0; i <= 8; i++) {
		context.drawImage(monImg[i], position[i].x, position[i].y, MON_SIZE, MON_SIZE);
	}
}

/**
 * Move monster
 */
monster.prototype.move = function() {
	this.x += speedX;
	this.y += speedY;
}
 /*
function move() {
	x += speedX;
	y += speedY;
	
	if ()
}
*/