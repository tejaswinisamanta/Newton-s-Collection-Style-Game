//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg;

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage("assets/background.png");
  catcherImg = loadImage("assets/newton.png");
  fallingObjectImg = loadImage("assets/apple.png");  
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  backgroundImg.resize(400, 400)
  catcherImg.resize(80, 0)
  fallingObjectImg.resize(20, 0)
  
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200,350, "k");
  catcher.color = color(95,158,160);
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg,100,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;
  

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  //Draw background image
  image(backgroundImg, 0, 0);
  
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the \ncatcher with \nthe left and \nright arrow keys \nto help hungry \nNewton catch \nthe apples.", width-80, 15);

  //If fallingObject reaches bottom, move back to top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
  }

  //Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  } 


  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }

  //If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 10);
    fallingObject.direction = "down";
    score = score + 1;
  } 


  //Draw the score to screen
  fill(0, 128, 128);
  textSize(15);
  text("Score = " + score, 6, 20);

  allSprites.debug = mouse.pressing();
  
  
}