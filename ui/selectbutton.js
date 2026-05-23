class SelectButton {
  constructor(x, y, l, h){
    this.x = x;
    this.y = y;
    this.l = l;//the level
    this.h = h;//is this a hard level
    this.fc = 0;//the final corner of the quad in the thingy
  }
  
  show(){
    const m = getScaledMouse();
    let dt = deltaTime / (1000 / 60);
    
    if(!this.h){
      fill(255);
      rect(this.x, this.y, 300, 400);
      noStroke();
      fill(240);
      triangle(this.x, this.y, this.x, this.y+400, this.x+300, this.y);
      stroke(0);
    }else{
      fill('#FC0000');
      rect(this.x, this.y, 300, 400);
      noStroke();
      fill('#B90000');
      triangle(this.x, this.y, this.x, this.y+400, this.x+300, this.y);
      stroke(0);
    }
    
    
    fill(0);
    rect(this.x-5, this.y, 5, 400);
    rect(this.x+300, this.y, 5, 400);
    rect(this.x, this.y-5, 300, 5);
    rect(this.x, this.y+400, 300, 5);
    
    fill(0);
    textAlign(CENTER);
    textSize(50);
    text("level " + this.l, this.x+150, this.y+75);
    
    if(this.h){
      fill(255);
      textSize(30);
      text("HARD LEVEL", this.x+153, this.y+200);
    }
    
    
    if(levelsUnlocked[this.l-1]){
      
      if(!this.h){
        fill('#77FA7C');
      }else{
        fill('#FF8C00');
      }
      
      
    }else{
      fill('#AFAFAF');
    }
    
    rect(this.x+75, this.y+300, 150, 60);
    fill(0);
    rect(this.x+75, this.y+297, 150, 3);
    rect(this.x+75, this.y+360, 150, 3);
    rect(this.x+72, this.y+300, 3, 60);
    rect(this.x+225, this.y+300, 3, 60);
    
    
    if(levelsUnlocked[this.l-1]){
      textSize(30);
      text("PLAY", this.x+120, this.y+330);
      text("NOW", this.x+175, this.y+355);
    }else{
      textSize(20);
      text("LOCKED", this.x+125, this.y+323);
      textSize(15);
      text("UNAVAILABLE", this.x+170, this.y+355);
    }
    
    
    
    if(levelsUnlocked[this.l-1]){
      
      if(!this.h){
        fill('#6DD870');
      }else{
        fill('#A25900');
      }
      
    }else{
      fill('#747474');
    }
    
    triangle(
      this.x+75, this.y+360, this.x+225, 
      this.y+300+this.fc,
      this.x+225, this.y+360
    );
    
    if(m.x > this.x+75 && m.x < this.x+225 &&
      m.y > this.y+300 && m.y < this.y+360){
      if(this.fc < 60){
        this.fc += 5;
      }
      
      if(mouseIsPressed && this.fc >= 55 && levelsUnlocked[this.l-1]){
        level = this.l;
        prepareForNextLevel()
        player.x = levelInfo[level][0]; 
        player.y = levelInfo[level][1];
        menu = false;
        levelSelect = false;
      }
      
    }else{
      if(this.fc > 0){
        this.fc -= 5;
      }
    }
    
  }
  
  move(){
    
    let targetX = 250 + (this.l - levelSelected) * 400;

    this.x = lerp(this.x, targetX, 0.1);

    if (abs(this.x - targetX) < 0.1) {
      this.x = targetX
    }
    
  }
  
}


let levelSelected = 1;

let levelButtons = [
  new SelectButton(0, 100, 1),
  new SelectButton(0, 100, 2),
  new SelectButton(0, 100, 3),
  new SelectButton(0, 100, 4, true),
  new SelectButton(0, 100, 5),
  new SelectButton(0, 100, 6),
  new SelectButton(0, 100, 7),
  new SelectButton(0, 100, 8),
  new SelectButton(0, 100, 9),
  new SelectButton(0, 100, 10, true),
  new SelectButton(0, 100, 11),
  new SelectButton(0, 100, 12),
  new SelectButton(0, 100, 13),
  new SelectButton(0, 100, 14, true),
  
]
