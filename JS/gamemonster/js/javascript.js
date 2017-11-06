/**
 * Game Monster
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

var REQ_ANIMATION = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
const BTN_SIZE = 50; // button size (Boom, Play, Restart)
const MON_SIZE = 50; // monster size
const M_TOP = 10; // margin-top
const M_RIGHT = 10; // margin-right
const ICO_SIZE = 8; // icon size (heart)
const GOT_SIZE = 32; // "gotcha" size
var SCORE = 0;
var HEART = 5;
var BOOM = 3;
var SPEED = 1;
var UP_LV_SCORE = SPEED * 50; // up level score
var SPM = 2000; // Seconds per Monster: create monster after SPM seconds
var STATUS = true; // Game status: Playing - true, Pause or Game over - false

/*
Draw background (button: BOOM, PAUSE, RESTART, PLAY. Icon: HEART)
*/
// Map (width: 530, height: 530) is under Menu (width: 530, height: 100)
const MIN_W = 0; // min width
const MIN_H = 100; // min height
var CANVAS = document.getElementById("canvas");
CANVAS.width = 530;
var MAP_W = CANVAS.width - MON_SIZE;
CANVAS.height = 530 + MIN_H;
var MAP_H = CANVAS.height - MON_SIZE;
var HALF_MAP_W = (MAP_W + MIN_W) / 2; // half map width
var HALF_MAP_H = (MAP_H + MIN_H) / 2; // half map height
var context = CANVAS.getContext("2d");
var BG_IMG = new Image(); // background image
BG_IMG.src = "img/bg01.png";
var BTN_BOOM = new Image();
BTN_BOOM.src = "img/icon_boom.png";
var BTN_PAUSE = new Image();
BTN_PAUSE.src = "img/icon_pause.png";
var BTN_RESTART = new Image();
BTN_RESTART.src = "img/icon_restart.png";
var BTN_PLAY = new Image();
BTN_PLAY.src = "img/icon_play.png";
var ICO_HEART = new Image(); // icon heart
ICO_HEART.src = "img/icon_heart.ico";
var GOTCHA = new Image();
GOTCHA.src = "img/gotcha.png";

var monImg = []; // Monsters's image source
var monMaxNum = 9; // Maximum number of monster's image 

for (var i = 0; i <= (monMaxNum - 1); i++) {
    monImg[i] = new Image();
    monImg[i].src = "img/monster" + (i + 1) + ".png";
}

var monsters = []; // Monsters can be display in game

/*
  A monster can be display in game
  @param {object} img
  @param {number} x
  @param {number} y
  @param {number} startX
  @param {number} startY
  @param {number} dirX
  @param {number} dirY
  @param {number} speed
*/
function monster(img, x, y, startX, startY, dirX, dirY, speed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.startX = startX;
    this.startY = startY;
    this.dirX = dirX;
    this.dirY = dirY;
    this.speed = speed;
}

var gotchaArray = [];

/*
  Display "gotcha" when monster is clicked
  @param {number} x
  @param {number} y
*/
function gotcha(x, y) {
    this.x = x;
    this.y = y;
}

/*
  Position (x, y) monster can run from
  @param {number} x
  @param {number} y
*/
function startPosition(x, y) {
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

/*
  Load Game on browser
*/
function loadGame() {
    drawForm();
    UP_LV_SCORE = SPEED * 50;
    if (monsters.length === 0) { createMonster(); } // Create new monster if there is no monster
    if (STATUS === true) { // Playing
        drawMonster();
        moveMonster();
    } else if (STATUS === false && HEART !== 0) { // Pause
        drawMonster();
        clearInterval(createMon);
        context.fillText("PAUSE", HALF_MAP_W, HALF_MAP_H);
    } else if (STATUS === false && HEART === 0) { // Game over
        clearInterval(createMon);
        context.fillText("GAME OVER", HALF_MAP_W, HALF_MAP_H);
    }
    checkGameOver();
    REQ_ANIMATION(loadGame);
}

/*
  After SPM (Seconds per monster) seconds, create a monster (image, postion) and push it into array monsters
*/
var createMon = setInterval(function(){ createMonster() }, SPM);
function createMonster() {
    upSpeed();
    var iImg = Math.floor(Math.random() * monImg.length); // random image's index
    var iPos = Math.floor(Math.random() * position.length); // random start position's index

    switch (iPos) {
        default: // monster's start position is not center
            var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[iPos].x, position[iPos].y, position[4].x, position[4].y, SPEED);
            monsters.push(mon);
            break;
        case 4: // monster's start position is center
            var i = 4;
            // random direction position for monster
            while (i === 4) {
                i = Math.floor(Math.random() * position.length);
            }
            
            var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[iPos].x, position[iPos].y, position[i].x, position[i].y, SPEED);
            monsters.push(mon);
            break;
    }
}

/*
  Draw monster in monsters array
*/
function drawMonster() {
    for (var i = 0; i < monsters.length; i++) {
        context.drawImage(monsters[i].img, monsters[i].x, monsters[i].y, MON_SIZE, MON_SIZE);
    }
}

// Move monsters in map: move them to direct position and back to start position.
// Remove them in monsters array and minus SCORE, HEART when they back to start position.
function moveMonster() {
    for (var i = 0; i < monsters.length; i++) {
        monsters[i].move();
        if (monsters[i].x === monsters[i].startX && monsters[i].y === monsters[i].startY) {
            monsters.splice(i, 1);
            HEART--;
            if (HEART === 0) {
                checkGameOver();
            } else if (SCORE !== 0) {
                SCORE -= 10;
            }
        }
    }
}

/*
  Display image: Background, Boom, Score, icon of Heart, Speed, gotcha
*/
function drawForm() {
    context.drawImage(BG_IMG, 0, 0, CANVAS.width, CANVAS.height); // fit image with canvas's width and height
    context.drawImage(BTN_BOOM, HALF_MAP_W, M_TOP, BTN_SIZE, BTN_SIZE);

    if (STATUS === true) {
        context.drawImage(BTN_PAUSE, HALF_MAP_W + BTN_SIZE + M_RIGHT, M_TOP, BTN_SIZE, BTN_SIZE);
    } else if (STATUS === false) {
        context.drawImage(BTN_PLAY, HALF_MAP_W + BTN_SIZE + M_RIGHT, M_TOP, BTN_SIZE, BTN_SIZE);
    }

    context.drawImage(BTN_RESTART, HALF_MAP_W + BTN_SIZE * 2 + M_RIGHT * 2, M_TOP, BTN_SIZE, BTN_SIZE);
    context.font = "12px Arial";
    context.fillText("Score: " + SCORE, M_RIGHT, M_TOP * 3);
    context.fillText("Heart: ", M_RIGHT, M_TOP * 5);
    for (var i = 0; i < HEART; i++) {
        context.drawImage(ICO_HEART, M_RIGHT * 5 + i * 10, M_TOP * 4, ICO_SIZE, ICO_SIZE);
    }
    context.fillText("Speed: " + SPEED, M_RIGHT, M_TOP * 7);
    context.fillText(BOOM, HALF_MAP_W + BTN_SIZE / 2, M_TOP * 7);
    for (var i = 0; i < gotchaArray.length; i++) {
        context.drawImage(GOTCHA, gotchaArray[i].x, gotchaArray[i].y, GOT_SIZE, GOT_SIZE);
    }
}

/*
  Move monster: move it to direct position and back to start position
*/
monster.prototype.move = function() {
    if (this.x === this.dirX && this.y === this.dirY) {
        this.dirX = this.startX;
        this.dirY = this.startY;
    }

    if (this.x < this.dirX) {
        this.x += this.speed;
    } else if (this.x > this.dirX) {
        this.x -= this.speed;
    }

    if (this.y < this.dirY) {
        this.y += this.speed;
    } else if (this.y > this.dirY) {
        this.y -= this.speed;
    }
}

/*
  Click Menu or Monster
  @param {object} e: event object
*/
CANVAS.addEventListener("mousedown", mouseDown, false);
function mouseDown(e) {
    var mouseX = e.pageX - CANVAS.offsetLeft;
    var mouseY = e.pageY - CANVAS.offsetTop;

    if (mouseY < MIN_H) {
        clickMenu(mouseX, mouseY);
    } else if (mouseY >= MIN_H && STATUS === true) {
        clickMonster(mouseX, mouseY);
    }
}

/*
  Click menu: Boom, Pause, Restart
  @param {number} mouseX
  @param {number} mouseY
*/
function clickMenu(mouseX, mouseY) {
    // Boom
    if (mouseX >= HALF_MAP_W && mouseX <= (HALF_MAP_W + BTN_SIZE) && mouseY >= M_TOP && mouseY <= (M_TOP + BTN_SIZE)) {
        if (BOOM > 0 && STATUS === true) {
            for (i = 0; i < monsters.length; i++) {
                SCORE += 10;
            }
            BOOM--;
            monsters = [];
        }
    }
    // Pause
    if (mouseX >= (HALF_MAP_W + BTN_SIZE + M_RIGHT) && mouseX <= (HALF_MAP_W + BTN_SIZE * 2 + M_RIGHT) && mouseY >= M_TOP && mouseY <= (M_TOP + BTN_SIZE)) {
        if (STATUS === true && HEART !== 0) {
            STATUS = false;
            clearInterval(createMon);
        } else if (STATUS === false && HEART !== 0) {
            STATUS = true;
            createMon = setInterval(function(){ createMonster() }, SPM);
        }
    }
    // Restart
    if (mouseX >= (HALF_MAP_W + BTN_SIZE * 2 + M_RIGHT * 2) && mouseX <= (HALF_MAP_W + BTN_SIZE * 3 + M_RIGHT * 2) && mouseY >= M_TOP && mouseY <= (M_TOP + BTN_SIZE)) {
        STATUS = true;
        SCORE = 0;
        HEART = 5;
        SPEED = 1;
        BOOM = 3;
        SPM = 2000;
        monsters = [];
        gotchaArray = [];
        clearInterval(createMon);
        createMon = setInterval(function(){ createMonster() }, SPM);
    }
}

/*
  Click monster (Miss: minus SCORE, minus HEART. Exact: plus SCORE, display "gotcha")
  @param {number} mouseX
  @param {number} mouseY
*/
function clickMonster(mouseX, mouseY) {
    var mon_length = monsters.length;

    for (var i = 0; i < monsters.length; i++) {
        var monWidth = monsters[i].x + MON_SIZE;
        var monHeight = monsters[i].y + MON_SIZE;
        
        // If click exactly
        if (mouseX >= monsters[i].x && mouseX <= monWidth && mouseY >= monsters[i].y && mouseY <= monHeight) {
            monsters.splice(i, 1);
        }
    }

    if (monsters.length < mon_length) { // click exactly
        SCORE += 10;
        var got = new gotcha(mouseX - GOT_SIZE / 2, mouseY - GOT_SIZE / 2);
        gotchaArray.push(got);
    } else { // click miss
        HEART--;
        if (HEART === 0) {
            checkGameOver();
        } else if (SCORE !== 0) {
            SCORE -= 10;
        }
    }
}

/*
  Up SPEED when SCORE is higher than UP_LV_SCORE
*/
function upSpeed() {
    if (SCORE >= UP_LV_SCORE) {
        if (SPEED < 5) {
            SPEED++;
        } else {
            SPEED *= 2;
        }
    }
}

/*
  Game over when HEART is equal or less than 0
*/
function checkGameOver() {
    if (HEART <= 0) {
        STATUS = false;
        clearInterval(createMon);
    }
}