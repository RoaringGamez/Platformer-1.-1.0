class End{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  show(){
    fill("#0FC417");
    rect(this.x, this.y, 33, 33);
    fill(0);
    rect(this.x, this.y-1, 33, 1);
    rect(this.x, this.y+33, 33, 1);
    rect(this.x-1, this.y+1, 1, 31);
    rect(this.x+33, this.y+1, 1, 31);
    noStroke();
    fill('#52F759');
    triangle(this.x+2, this.y+1, this.x+2, this.y+33, this.x+32, this.y+1);
    fill('#FFFFFF');
    stroke('#FFFFFF');
    rect(this.x+5, this.y+5, 3, 3);
    rect(this.x+11, this.y+5, 3, 3);
    rect(this.x+5, this.y+11, 3, 3);
    
    stroke(0);
  }
  
  checkCollision(){
    
    if(
      player.x+25 > this.x && player.x-25 < this.x+33 &&
      player.y+25 > this.y && player.y-25 < this.y+33 && playerAlive
    ){
      levelCompleted = true;
      level += 1;
      player.x = levelInfo[level][0];
      player.y = levelInfo[level][1];
      prepareForNextLevel();
      levelsUnlocked[level-1] = true;
      storeItem("levelsUnlocked", levelsUnlocked);
    }
    
  }
  
}