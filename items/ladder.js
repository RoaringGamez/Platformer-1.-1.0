class Ladder{
  constructor(x, y, h){
    this.x = x;
    this.y = y;
    this.h = h;
    this.localGroundHeight = this.y+this.h
    this.playerOnLadder = false;
    this.allLava = [];
  }
  
  show(){
    
    fill('#8F3515');
    let i = 20;
    while(i < this.h){
      rect(this.x-30, this.y+i, 60, 5);
      i += 20;
    }    
    stroke(0);
    strokeWeight(2);
    fill('#B9461D');
    rect(this.x-30, this.y, 10, this.h);
    rect(this.x+20, this.y, 10, this.h);
    fill('#AFAFAF');
    stroke('#525050');
    rect(this.x-27, this.y+5, 4, 4);
    rect(this.x-27, this.y+this.h-10, 4, 4);
    rect(this.x+23, this.y+5, 4, 4);
    rect(this.x+23, this.y+this.h-10, 4, 4);
    stroke(0);
    strokeWeight(1);
    
    
  }
  
  checkCollision(){
    let dt;
    
    if(!lastFramePaused){
      dt = deltaTime / (1000 / 60);
    }else{
      dt = 1;
    }
    
    if(
      player.x+25 > this.x-20 && player.x-25 < this.x+20 && 
      player.y+25 > this.y && player.y-25 < this.y+this.h && !this.playerOnLadder
    ){
      this.playerOnLadder = true;
      this.localGroundHeight = player.y+25;
    } else if(
      player.x+25 > this.x-20 && player.x-25 < this.x+20 && 
      player.y+25 > this.y && player.y-25 < this.y+this.h && this.playerOnLadder
    ){
      groundHeight = this.localGroundHeight
      if(keyIsDown(87) && this.localGroundHeight > this.y){
        this.localGroundHeight -= 1.5*dt;
      }
      if(keyIsDown(83) && this.localGroundHeight < this.y+this.h){
        this.localGroundHeight += 1.5*dt;
      }
    }else{
      this.localGroundHeight = this.y+this.h;
      this.playerOnLadder = false;
    }
    
    
    
  }
  
  
}