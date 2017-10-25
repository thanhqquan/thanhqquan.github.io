/**
 * Game Monster
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

var SCORE = 0;
var HEART = 5;
var SPEED = 1;
var BOOM = 3;
var BUTTON_SIZE = 50;
var MONSTER_SIZE = 50;

/**
 * Draw background
 */
var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 600;
var haft_w = canvas.width / 2;
var haft_h = canvas.height / 2 + 50;
var context = canvas.getContext("2d");
var bgImg = new Image(); // background image
bgImg.src = "img/bg01.png";
var btnBoom = new Image(); 
btnBoom.src = "img/icon_boom.png";
var btnPause = new Image();
btnPause.src = "img/icon_pause.png";
var btnRestart = new Image();
btnRestart.src = "img/icon_restart.png";

var monImg = [];
var monMaxNum = 9; // Monster's maximum number
for (var i = 0; i<= (monMaxNum - 1); i++) {
	monImg[i] = new Image();
	monImg[i].src = "img/monster" + (i + 1) + ".png";
}
/**
 * Monster's information: image of monster, coordinate(x, y), direction point(dirX, dirY), monster is alive
 */
function monster(img, x, y, dirX, dirY, isAlive) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.dirX = dirX;
	this.dirY = dirY;
	this.isAlive = isAlive;
}

function startPosition(x,y) {
	this.x = x;
	this.y = y;
}

// Start position of monster
var position = [];
position[0] = new startPosition(0,100);
position[1] = new startPosition(haft_w-25,100);
position[2] = new startPosition(canvas.width-50,100);
position[3] = new startPosition(0,haft_h);
position[4] = new startPosition(haft_w-25,haft_h);
position[5] = new startPosition(canvas.width-50,haft_h);
position[6] = new startPosition(0,canvas.height-50);
position[7] = new startPosition(haft_w-25,canvas.height-50);
position[8] = new startPosition(canvas.width-50,canvas.height-50);

/**
 * Load Game
 */
function loadGame() {
	drawForm();
	//drawMonster();
}

/**
 * Draw monster: random image and position
 */
/*
function drawMonster() {
	var iImg = Math.floor((Math.random() * monImg.length); // random image's index
	var iPos = Math.floor((Math.random() * position.length); // random position's index
	
	//context.drawImage(monImg[iImg], position[iPos].x, position[iPos].y, MONSTER_SIZE, MONSTER_SIZE);
	for (var i = 0; i <= 8; i++) {
		context.drawImage(monImg[i], position[i].x, position[i].y, MONSTER_SIZE, MONSTER_SIZE);
	}
}

/**
 * Display Background, Score, Heart, Speed, icons
 */
function drawForm() {
	context.drawImage(bgImg, 0, 0, canvas.width, canvas.height); // fit image with canvas's width and height
	context.drawImage(btnBoom, haft_w, 10, BUTTON_SIZE, BUTTON_SIZE);
	context.drawImage(btnPause, haft_w + BUTTON_SIZE + 10, 10, BUTTON_SIZE, BUTTON_SIZE);
	context.drawImage(btnRestart, haft_w + BUTTON_SIZE * 2 + 20, 10, BUTTON_SIZE, BUTTON_SIZE);
	context.font = "12px Arial";
	context.fillText("Score: ", 10, 30);
	context.fillText("Heart: ", 10, 50);
	context.fillText("Speed: ", 10, 70);
	
	for (var i = 0; i <= 8; i++) {
		context.drawImage(monImg[i], position[i].x, position[i].y, MONSTER_SIZE, MONSTER_SIZE);
	}
}