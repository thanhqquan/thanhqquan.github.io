/**
 * Game Monster
 * @author quan.hnt3777@sinhvien.hoasen.edu.vn (Quan Huynh)
 */

var reqAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
const BTN_SIZE = 50; // button size (Boom, Play, Restart)
const MON_SIZE = 50; // monster size
const M_TOP = 10; // margin-top
const M_RIGHT = 10; // margin-right
const ICO_SIZE = 8; // icon size (heart)
var SCORE = 0;
var HEART = 5;
var BOOM = 3;
var SPEED = 1;
var STATUS = 1; // Game status: 1 = Playing, 2 = Pause, 0 = Game over

/**
 * Draw background
 */
// Map (width: 500, height: 500) is under Menu (width: 500, height: 100)
const MIN_W = 0;
const MIN_H = 100;
var CANVAS = document.getElementById("canvas");
CANVAS.width = 500;
var MAP_W = CANVAS.width - MON_SIZE;
CANVAS.height = 500 + MIN_H;
var MAP_H = CANVAS.height - MON_SIZE;
var HALF_MAP_W = (MAP_W + MIN_W) / 2;
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
var BTN_PLAY = new Image();
BTN_PLAY.src = "img/icon_play.png";
var ICO_HEART = new Image(); // icon heart
ICO_HEART.src = "img/icon_heart.ico";

var monImg = [];
var monMaxNum = 9; // Monster's maximum number
for (var i = 0; i<= (monMaxNum - 1); i++) {
    monImg[i] = new Image();
    monImg[i].src = "img/monster" + (i + 1) + ".png";
}
/**
 * Monster's information: image of monster, coordinate(x, y), direction point(dirX, dirY), monster is alive (= 1) or not (= 0) 
 */
function monster(img, x, y, startX, startY, dirX, dirY, isAlive) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.startX = startX;
    this.startY = startY;
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

// var stop = false;
// var fps, fpsInterval, startTime, now, then, elapsed;

// startAnimating(5);

// function startAnimating(fps) {
    // fpsInterval = 1000 / fps;
    // then = Date.now();
    // startTime = then;
    // loadGame();
// }

/**
 * Load Game on browser
 */
function loadGame() {
    drawForm();
    if (STATUS == 1) {
        createMonster();
        // setInterval(createMonster, 1000 / 60);
        drawMonster();
        moveMonster();
    } else if (STATUS == 2) {
        drawMonster();
        context.fillText("PAUSE", HALF_MAP_W, HALF_MAP_H);
    } else {
        context.fillText("GAME OVER", HALF_MAP_W, HALF_MAP_H);
    }
    reqAnimation(loadGame);
    // setTimeout(loadGame, 1000 / 60);

    // drawForm();
    // if (STATUS == 1) {
        // if (stop) {
            // return;
        // }
        
        // now = Date.now();
        // elapsed = now - then;
        
        // if (elapsed > fpsInterval) {
            // then = now - (elapsed % fpsInterval);
            // createMonster();
        // }
        // drawMonster();		
        // moveMonster();
    // } else if (STATUS == 2) {
        // context.fillText("PAUSE", HALF_MAP_W, HALF_MAP_H);
        // drawMonster();
    // } else {
        // context.fillText("GAME OVER", HALF_MAP_W, HALF_MAP_H);
    // }
    // reqAnimation(loadGame);
}

/**
 * Create and push a monster into array monsters
 */
function createMonster() {
    var iImg = Math.floor(Math.random() * monImg.length); // random image's index
    var iPos = Math.floor(Math.random() * position.length); // random start position's index

    switch (iPos) {
        default: // monster's start position is not center
            var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[iPos].x, position[iPos].y,position[4].x, position[4].y, 1);
            monsters.push(mon);
            break;
        case 4: // monster's start position is center
            var i = 4;
            // random direction position for monster
            while (i == 4) {
                i = Math.floor(Math.random() * position.length);
            }
            
            var mon = new monster(monImg[iImg], position[iPos].x, position[iPos].y, position[iPos].x, position[iPos].y, position[i].x, position[i].y, 1);
            monsters.push(mon);
            break;
    }
}

/**
 * Draw monster: random image and position
 */
function drawMonster() {
    // for (var j = 0; j < monsters.length; j++) {
        // context.drawImage(monsters[j].img, monsters[j].x, monsters[j].y, MON_SIZE, MON_SIZE);
    // }
    context.drawImage(monsters[0].img, monsters[0].x, monsters[0].y, MON_SIZE, MON_SIZE);
}

/**
 * Move monster in map
 */
function moveMonster() {
    // for (var j = 0; j < monsters.length; j++) {
        // monsters[j].move();
    // }
    monsters[0].move();
}

/**
 * Display Background, Score, Heart, Speed, icons
 */
function drawForm() {
    context.drawImage(BG_IMG, 0, 0, CANVAS.width, CANVAS.height); // fit image with canvas's width and height
    context.drawImage(BTN_BOOM, HALF_MAP_W, M_TOP, BTN_SIZE, BTN_SIZE);

    if (STATUS == 1) {
        context.drawImage(BTN_PAUSE, HALF_MAP_W + BTN_SIZE + M_RIGHT, M_TOP, BTN_SIZE, BTN_SIZE);
    } else if (STATUS == 2) {
        context.drawImage(BTN_PLAY, HALF_MAP_W + BTN_SIZE + M_RIGHT, M_TOP, BTN_SIZE, BTN_SIZE)
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
}

/**
 * Move monster
 */
monster.prototype.move = function() {
    if (this.x == this.dirX && this.y == this.dirY) {
        this.dirX = this.startX;
        this.dirY = this.startY;
    }

    if (this.x < this.dirX) {
        this.x += SPEED;
    } else if (this.x > this.dirX) {
        this.x -= SPEED;
    }

    if (this.y < this.dirY) {
        this.y += SPEED;
    } else if (this.y > this.dirY) {
        this.y -= SPEED;
    }
}

CANVAS.addEventListener("mousedown", mouseDown, false);
/**
 * Event Click: click Menu or Map
 */
function mouseDown(e) {
    var mouseX = e.pageX - CANVAS.offsetLeft;
    var mouseY = e.pageY - CANVAS.offsetTop;

    if (mouseY < MIN_H) {
        clickMenu(mouseX, mouseY);
    }
}

/**
 * Click menu: Boom, Pause, Restart 
 * @param mouseX: coordinate x
 * @param mousey: coordinate y
 */
function clickMenu(mouseX, mouseY) {
    // Boom
    if (mouseX >= HALF_MAP_W && mouseX <= (HALF_MAP_W + BTN_SIZE) && mouseY >= M_TOP && mouseY <= (M_TOP + BTN_SIZE)) {
        if (BOOM > 0 && STATUS == 1) {
            for (i = 0; i < monsters.length; i++) {
                if (monsters[i].isAlive == 1) {
                    SCORE += 10;
                }
            }
            BOOM--;
            monsters = [];
            drawForm();
        }
    }
    // Pause
    if (mouseX >= (HALF_MAP_W + BTN_SIZE + M_RIGHT) && mouseX <= (HALF_MAP_W + BTN_SIZE * 2 + M_RIGHT) && mouseY >= M_TOP && mouseY <= (M_TOP + BTN_SIZE)) {
        if (STATUS == 1) {
            STATUS = 2;
        } else if (STATUS == 2) {
            STATUS = 1;
        }
    }
    // Restart
    if (mouseX >= (HALF_MAP_W + BTN_SIZE * 2 + M_RIGHT * 2) && mouseX <=(HALF_MAP_W + BTN_SIZE * 3 + M_RIGHT * 2) && mouseY >= M_TOP && mouseY <= (M_TOP + BTN_SIZE)) {
        SCORE = 0;
        HEART = 5;
        SPEED = 1;
        BOOM = 3;
        monsters = [];
    }
}