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
var SPEED_X = 1;
var SPEED_Y = 1;

/**
 * Draw background
 */
//Map (width: 500, height: 500) is under Menu (width: 500, height: 100)
const MIN_W = 0;
const MIN_H = 100;
var CANVAS = document.getElementById("canvas");
CANVAS.width = 500;
var MAP_W = CANVAS.width - MON_SIZE;
console.log(MAP_W);
CANVAS.height = 500 + MIN_H;
var MAP_H = CANVAS.height - MON_SIZE;
var HALF_MAP_W = (MAP_W + MIN_W) / 2;
console.log(HALF_MAP_W);
var HALF_MAP_H = (MAP_H + MIN_H) / 2;
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
	this.y = y;
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
position[0] = new startPosition(MIN_W, MIN_H); // left top
position[1] = new startPosition(HALF_MAP_W, MIN_H); // middle top
position[2] = new startPosition(MAP_W, MIN_H); // right top
position[3] = new startPosition(MIN_W, HALF_MAP_H); // left middle
position[4] = new startPosition(HALF_MAP_W, HALF_MAP_H); // center
position[5] = new startPosition(MAP_W, HALF_MAP_H); // right middle
position[6] = new startPosition(MIN_W, MAP_H); // left bottom
position[7] = new startPosition(HALF_MAP_W, MAP_H); // middle bottom
position[8] = new startPosition(MAP_W, MAP_H); // right bottom

var monsters = [];
/**
 * Load Game
 */
function loadGame() {
	drawForm();
	drawMonster();
	reqAnimation(loadGame);
}

/**
 * Draw monster: random image and position
 */
function drawMonster() {
	var iImg = Math.floor(Math.random() * monImg.length); // random image's index
	var iPos = Math.floor(Math.random() * position.length); // random start position's index
	
	switch (iPos) {
		default: // monster's start position is not center
			var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[4].x, position[4].y, 1);
			monsters.push(mon);
			break;
		case 4: // monster's start position is center
			var i = 4;
			// random direction position for monster
			while (i == 4) {
				i = Math.floor(Math.random() * position.length);
			}
			
			var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[i].x, position[i].y, 1);
			monsters.push(mon);
			break;
	}
	// var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[4].x, position[4].y, 1);
	
	
	// context.drawImage(monImg[iImg], position[iPos].x, position[iPos].y, MON_SIZE, MON_SIZE);
	
	// for (var i = 0; i <= monsters.length; i++) {
		// context.drawImage(monsters[i].img, monsters[i].x, monsters[i].y, MON_SIZE, MON_SIZE);
		// monsters[i].move();
	// }
	
	context.drawImage(monsters[0].img, monsters[0].x, monsters[0].y, MON_SIZE, MON_SIZE);
	monsters[0].move();
}

/**
 * Display Background, Score, Heart, Speed, icons
 */
function drawForm() {
	context.drawImage(BG_IMG, 0, 0, CANVAS.width, CANVAS.height); // fit image with canvas's width and height
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
	
	
	// if (this.x == (this.y - MIN_H)) { // monster has start position at 0 and 8
		// if (this.x < HALF_MAP_W) {
			// this.x += SPEED_X;
			// this.y += SPEED_Y;
		// } else {
			// this.x -= SPEED_X;
			// this.y -= SPEED_Y;
		// }
	// } else if (this.x == HALF_MAP_W) { // monster has start position at 1 and 7
		// if (this.y < HALF_MAP_H) {
			// this.y += SPEED_Y;
		// } else {
			// this.y -= SPEED_Y;
		// }
	// } else if ((this.x + this.y) == MAP_H) { // monster has start position at 3 and 6
		// if (this.y > HALF_MAP_H) {
			// this.x += SPEED_X;
			// this.y -= SPEED_Y;
		// } else {
			// this.x -= SPEED_X;
			// this.y += SPEED_Y;
		// }
	// } else if (this.y == HALF_MAP_H) { // monster has start position at 4 and 6
		// if (this.x < HALF_MAP_W) {
			// this.x += SPEED_X;
		// } else {
			// this.x -= SPEED_X;
		// }
	// }

	if (this.x == this.dirX && this.y == this.dirY) {
		var sign = -1;
	} else var sign = 1;
	
	if (this.x < this.dirX) {
		this.x += SPEED_X * sign;
	} else if (this.x > this.dirX) {
		this.x -= SPEED_X * sign;
	}
	
	if (this.y < this.dirY) {
		this.y += SPEED_Y * sign;
	} else if (this.y > this.dirY) {
		this.y -= SPEED_Y * sign;
	}

	// if (this.x > this.dirX) {
		// this.x += SPEED_X * sign;
	// } else if (this.x > this.dirX) {
		// this.x -= SPEED_X * sign;
	// }
	
	// if (this.y < this.dirY) {
		// this.y += SPEED_Y * sign;
	// } else if (this.y > this.dirY) {
		// this.y -= SPEED_Y * sign;
	// }
}
 /*
function move() {
	x += SPEED_X;
	y += SPEED_Y;
	
	if ()
}
*/