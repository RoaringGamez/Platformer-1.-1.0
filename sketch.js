const baseH = 600;
const baseW = baseH * (4 / 3);

let scaleFactor;
let xOffset = 0;
let yOffset = 0;
//base variables
 
let groundHeight = 600;//the height of the ground 
let levelCompleted = false;//is the level completed
let backgroundFill = 700;//how translucent the backgorund is
let playerAlive = true;

let menu = true;
let settingsMenu = false;
let levelSelect = false;
let startTriangleDown = 0;


let FPS = 0;
let FPSCheck = 0;
let pause = false;

let camX = 0;
let lastFramePaused = false;
let allowDeltaTime = true;

let levelsUnlocked = [
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  document.body.style.overflow = "hidden";
  updateScale();
  levelsUnlocked = getItem("levelsUnlocked") || levelsUnlocked;
  
  let storedDelta = getItem("allowDeltaTime");
  if (storedDelta !== null) {
    allowDeltaTime = storedDelta;
  }
  
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    updateScale();
  }

function updateScale(){
    const scaleH = windowHeight / baseH;
    const scaleW = windowWidth / baseW;
    scaleFactor = min(scaleH, scaleW);

    xOffset = (windowWidth - baseW * scaleFactor) / 2;
    yOffset = (windowHeight - baseH * scaleFactor) / 2;
  }

function getScaledMouse() {
    return {
      x: (mouseX - xOffset) / scaleFactor,
      y: (mouseY - yOffset) / scaleFactor
    };
  }

function mouseReleased(){
  const m = getScaledMouse();
  
  if(m.x > 25 && m.x < 75 && m.y > 275 && m.y < 325 && levelSelected > 1){
    levelSelected -= 1;
  }//go left
  
  if(m.x > 725 && m.x < 775 && m.y > 275 && m.y < 325 &&
     levelSelected < levelButtons.length
    ){
    levelSelected += 1;
  }//go right
  
  if(m.x > 700 && m.x < 780 && m.y > 10 && m.y < 30 && menu && !levelSelect){
    if(settingsMenu){
      settingsMenu = false;
    }else{
      window.open("https://editor.p5js.org/RoaringGamez/full/nqcqwCHOX", '_blank');
    }
    
    
  }//fullscreen
  
  if(m.x > 300 && m.x < 400 && m.y > 130 && m.y < 150){
    allowDeltaTime = !allowDeltaTime;
    
    storeItem("allowDeltaTime", allowDeltaTime);
    
    if(!allowDeltaTime){
      lastFramePaused = true;
    }else{
      lastFramePaused = false;
    }
  }
  
}

class Player{
  
  constructor(x, y, df){
    this.x = x;
    this.y = y;
    this.fallSpeed = 0;
    this.jumping = 0;
    this.directionFacing = 1;
    this.playerRotate = 0;
    this.rotating = false;
    this.playerSpeed = 0;
    this.upsideDown = false;
    this.jumpCooldown = 10;
    this.offPlatformTime = 0;
    this.lastFrameKeyDown = false;
    this.okToJump = false;
  }
  
  show(){
    
    push();
    translate(this.x, this.y);
    rotate(this.playerRotate);
    if(playerAlive){
      fill(255, 50, 50);
      rect(-23, -23, 46, 46);
      fill(225, 50, 50);
      noStroke();
      if(!this.upsideDown){
        triangle(-22, -22, -22, 22, 22, -22);
      }else{
        triangle(22, 22, 22, -22, -22, 22);
      }
    }else{
      fill(255, 250, 250);
      rect(-23, -23, 46, 46);
      fill(225, 250, 250);
      noStroke();
      if(!this.upsideDown){
        triangle(-22, -22, -22, 22, 22, -22);
      }else{
        triangle(22, 22, 22, -22, -22, 22);
      }
      
    }
    stroke(0);
    fill(0);
    fill(0, 0, 0);
    rect(-23, -25, 46, 2);
    rect(-23, 23, 46, 2);
    rect(-25, -23, 2, 46);
    rect(23, -23, 2, 46);
    pop();
    push();
    translate(this.x, this.y);
    fill(0);
    if(this.directionFacing === 1){
      ellipse(15, -3, 5, 10);
    }else{
      ellipse(-13, -3, 5, 10);
    }
    
    if(!playerAlive){
      strokeWeight(3);
      stroke(255);
      if(this.directionFacing === 1){
        point(15, -3);
      }else{
        point(-13, -3);
      }
    
    }
    stroke(0);
    strokeWeight(1);
    
    pop();
    
  }
  
  move(){
    
    let dt;
    
    if(!lastFramePaused){
      dt = deltaTime / (1000 / 60);
    }else{
      dt = 1;
    }
    
    if(this.lastFrameKeyDown && !keyIsDown(32)){
      this.okToJump = true;
    }
    
    if(this.jumping === 0 && this.y+25 < groundHeight && this.offPlatformTime > 12){
      this.jumping = 1;
    }//when you fall only one jump law
    
    if(this.y+25 < groundHeight){
      this.offPlatformTime += 1*dt;
    }//increase off platform time
    
    if(this.jumping > 0 && this.jumpCooldown > 0){
      this.jumpCooldown -= 1*dt;
    }//reduce the jump cooldown
    
    if(this.jumping > 0 || this.y+25 < groundHeight){
      if(this.fallSpeed < 15){this.fallSpeed += 0.15*dt;}//fallFaster
      this.y += this.fallSpeed*dt;//fall 
    }//fallDown
    
    if(this.y+25 >= groundHeight){
      this.jumping = 0;//end jumping
      this.fallSpeed = 0;
      this.jumpCooldown = 0;
      this.offPlatformTime = 0;
      this.okToJumpAgain = false;
      
      if(this.y+25 > groundHeight){
        this.y = groundHeight-25;//correct for overjumping
      }
      
    }//when you hit the ground
    
    if(this.jumping > 0 && this.y+25 < groundHeight){
      
      if(this.rotating){
        
        if(this.directionFacing === 1){
          this.playerRotate += 10*dt;
          if(this.playerRotate > 180){
            this.playerRotate = 0;
            this.rotating = false;
            this.upsideDown = !this.upsideDown;//change if the player is upside down
          }
        }//rotate left
        
        if(this.directionFacing === 0){
          this.playerRotate -= 10*dt;
          if(this.playerRotate < -180){
            this.playerRotate = 0;
            this.rotating = false;
            this.upsideDown = !this.upsideDown;//change if the player is upside down
          }
        }//rotate right
        
      }//rotate the player when jumping
      
    }else{
      this.playerRotate = 0;
    }//what happens when jumping
    
    if(keyIsDown(32) && this.jumping === 0){
      this.jumping = 1;//start the jump
      this.fallSpeed = -4;
      this.jumpCooldown = 20;
    }else if(keyIsDown(32) && this.jumping === 1 && this.jumpCooldown <= 0 && this.okToJump){
      this.jumping = 2;//start the jump
      this.fallSpeed = -3;
      this.rotating = true;//start the player's rotation  
      this.jumpCooldown = 20;
      this.okToJump = false;
    }
    
    if(keyIsDown(65)){
      this.directionFacing = 0;
    }
    
    if(keyIsDown(68)){
      this.directionFacing = 1;
    }
    
    this.lastFrameKeyDown = keyIsDown(32);
    
    this.x += this.playerSpeed*dt
    
  }
  
}

let player = new Player(levelInfo[level][0], levelInfo[level][1], 1);

function draw(){
  const m = getScaledMouse();

  push();
  translate(xOffset, yOffset);
  scale(scaleFactor);

  //start code
  
  
  if(!menu){
    
    let dt;
    
    if(!lastFramePaused){
      dt = deltaTime / (1000 / 60);
    }else{
      dt = 1;
    }
    
    
    let targetCamX = player.x - (baseW/2);
  
    let camX = targetCamX

    if(
      levelInfo[level][2]
    ){

      if(camX < 0){
        camX = 0;
      }

      if(camX > levelInfo[level][3]){
        camX = levelInfo[level][3];
      }

    }
    
    background(255);
    
    push();
    if(levelInfo[level][2]){
      translate(-camX, 0); // Move everything left as the player moves right
    }
    groundHeight = 600;

    for(
      let i = 0; i < levels[level].length; i++
    ){
      levels[level][i].show();
      levels[level][i].checkCollision();
    }//show level items
    
    if(level === 1){
      fill(0);
      textSize(40);
      text("Use A/D to move", 100, 100);
      text(" <--  --> ", 30, 500);
      text("Jump" , 205, 545);
      text("Jump" , 525, 500);
      text("Press W to climb", 1840, 100);
      text("Jump", 2050, 190);
      text("Jump Again", 2150, 320);
    }

    player.show();//show player
    
    

    {

      if(!levelCompleted && playerAlive){
        player.move();//move player
      }
      
      if(player.playerSpeed < 0.19 && player.playerSpeed > -0.19){
        player.playerSpeed = 0;
      }

      if(keyIsDown(65)) {
        if(player.playerSpeed > -2.5){
          player.playerSpeed -= 0.2;
        }
      }else{
        if(player.playerSpeed < 0){
          player.playerSpeed += 0.15;
        }
      }//left

      if(keyIsDown(68)){
        if(player.playerSpeed < 2.5){
          player.playerSpeed += 0.2;
        }
      }else{
        if(player.playerSpeed > 0){
          player.playerSpeed -= 0.15;
        }
      }//right

    }//player movement

    if(levelCompleted){
      background(111, 241, 116, backgroundFill);
      backgroundFill -= 20;
      if(backgroundFill <= 20){
        levelCompleted = false;
        player.fallSpeed = 0;
        backgroundFill = 700;
      }
    }

    if(!playerAlive){
      player.y += player.fallSpeed*dt;
      if(player.fallSpeed < 8){player.fallSpeed += 0.1*dt;}

      if(player.y > 625){
        background('#E23B3B');
      }

      if(player.y > 750){
        player.x = levelInfo[level][0];
        player.y = levelInfo[level][1];
        playerAlive = true;
        player.fallSpeed = 0;
        
        if(level === 12){
          levels[12][0] = new MovingPlatform(0, 310, 100, 20, 0, 2000, 2, 1.5);
        }
        
      }

    }//what happens after the player dies
    
    pop();
    
    {

    if(FPSCheck > 5){
       FPS = floor(frameRate());
       FPSCheck = 0;
    }

    FPSCheck++;

    if(FPS > 59.5){
      //FPS = 60;
    }

    if(FPS < 24){
      FPS = 'LOW'
    }

    textSize(10);
    fill(0);
    text("FPS: " + FPS, 3, 10);
  }//FPS Check
    
    if(pause){
      fill(200, 200, 200, 150);
      noStroke();
      rect(0, 0, 800, 600);
      fill(0);
      textSize(40);
      text("paused, press 'p' to resume", 150, 200);
      stroke(0);
      noLoop();
    }
    
    if(lastFramePaused && !pause && allowDeltaTime){
      lastFramePaused = false;
    }

  }else if(!settingsMenu){
    
    background('#78F0FF');
    noStroke();
    fill('#4EEBFF');
    triangle(0, 0, 800, 0, 0, 600);
    stroke(0);
    
    if(levelSelect){
      
      for(let i = 0; i < levelButtons.length; i++){
        levelButtons[i].show();      
        levelButtons[i].move();
      }//level buttons

      fill(255);



      if(m.x > 25 && m.x < 75 && m.y > 275 && m.y < 325){
        fill('#6DD870');
      }else{
        fill('#77FA7C');
      }
      rect(25, 275, 50, 50, 5);
      fill(0);
      textSize(40);
      text("<", 50, 314);

      if(m.x > 725 && m.x < 775 && m.y > 275 && m.y < 325){
        fill('#6DD870');
      }else{
        fill('#77FA7C');
      }
      rect(725, 275, 50, 50, 5);
      fill(0);
      textSize(40);
      text(">", 750, 314);
      
      if(m.x > 25 && m.x < 100 && m.y > 25 && m.y < 60){
        fill('#6DD870');
        
        if(mouseIsPressed){
          levelSelect = false;
        }
        
      }else{
        fill('#77FA7C');
      }
      rect(25, 25, 75, 35, 2);
      fill(0);
      textSize(17)
      text("Back", 60, 50);
      
    }else{
      
      if(m.x > 200 && m.x < 600 && m.y >300 && m.y < 475){
        if(startTriangleDown < 175){
           startTriangleDown += 7;
        }else{
          if(mouseIsPressed){
             levelSelect = true;
             startTriangleDown = 0;
             codeOffTimer = 0;
             code = [];
           }
        }
      }else{
        if(startTriangleDown > 0){
          startTriangleDown -= 7;
        }
      }
      
      fill('#77FA7C');
      rect(200, 300, 400, 175);
      fill(0);
      textSize(25);
      text("(Select Level)", 400, 430);
      noStroke();
      fill(200);
      fill('#5EBB61');
      triangle(200, 475, 600, 475, 600, 300+startTriangleDown);
      stroke(0);
      fill(0);
      rect(200, 295, 400, 5);
      rect(200, 475, 400, 5);
      rect(195, 300, 5, 175);
      rect(600, 300, 5, 175);
      textSize(55);
      text("PLAY", 225, 375);
      //start button
      
      if(codeOffTimer > 100){
        fill('#69F26F');
        codeOffTimer -= 1;
        if(codeOffTimer < 102){
          codeOffTimer = 0;
        }
      }else{
        fill(255);
      }
      strokeWeight(3);
      rect(10, 10, 200, 20);
      strokeWeight(1);
      
      textSize(15);
      fill(0);
      if(code.length < 1){
        fill(200);
        text("Enter a code...", 12, 25);
      }
      text(code.join(""), 12, 25);
      
      if(playerMessages.length > 0){
        fill(255, 0, 0);
        textSize(20);
        text(playerMessages.join(""), 12, 550);
        codeOffTimer -= 1;
      }
      
      if(codeOffTimer <= 2){
        playerMessages = [];
      }
      
      if(m.x > 700 && m.x < 780 && m.y > 10 && m.y < 30){
        fill(220);
      }else{
        fill(255);
      }
      strokeWeight(3);
      rect(700, 10, 80, 20);
      strokeWeight(1);
      textSize(15);
      fill(0);
      text("Fullscreen", 705, 25);
      
      if(m.x > 250 && m.x < 550 && m.y > 500 && m.y < 520){
        fill(220);
        
        if(mouseIsPressed){
          settingsMenu = true;
        }
        
      }else{
        fill(255);
      }
      
      strokeWeight(3);
      rect(250, 500, 300, 20);
      strokeWeight(1);
      textSize(15);
      fill(0);
      text("Settings", 370, 515);
      
    }

    
  }else if(settingsMenu){
    background(50);
    
    if(m.x > 700 && m.x < 780 && m.y > 10 && m.y < 30){
      fill(220);
    }else{
      fill(255);
    }
    strokeWeight(3);
    rect(700, 10, 80, 20);
    strokeWeight(1);
    textSize(15);
    fill(0);
    text("EXIT", 722, 25);
    
    fill(255);
    textSize(30);
    text("Allow DeltaTime", 50, 150);
    
    
    if(m.x > 300 && m.x < 400 && m.y > 130 && m.y < 150){
      fill(220);
    }else{
      fill(255);
    }
    strokeWeight(3);
    rect(300, 130, 100, 20);
    strokeWeight(1);
    
    textSize(15);
    fill(0);
    if(allowDeltaTime){
      text("TRUE", 330, 145);
    }else{
      text("FALSE", 325, 145);
    }
    
  }
  
  
  
  //end code

  fill(0);
  rect(-1000, 0, 1000, baseH);// left bar
  rect(baseW, 0, 1000, baseH);// right bar
  rect(0, -1000, baseW, 1000);// top bar
  rect(0, baseH, baseW, 1000);// bottom bar

  pop();
    
  
  
  
}
