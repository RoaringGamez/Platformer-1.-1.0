class Spike{
  constructor(x, y, h, sp, ep, d, speed){
    this.x = x;
    this.y = y;
    this.h = h;
  }
  
  show(){
    push();
    
    translate(this.x, this.y);
    let X = 0;
    let Y = 0;
    let H = this.h;
    strokeWeight(2);
    fill(120, 134, 148);
    triangle(X+-10,Y+1,X+10,Y+1,X,Y-H);
    noStroke();
    fill(188, 205, 219);
    triangle(X+-8,Y-1,X+0,Y-1,X,Y-H+3);
    stroke(1);
    pop();
  }
  
  checkCollision(){
    
    if(
      player.x+25 > this.x-6 && player.x-25 < this.x+6 && playerAlive &&
      player.y+25 > this.y-(this.h/1.2) && player.y-25 < this.y
    ){
      playerAlive = false;
      player.fallSpeed = -2;
    }
    
  }
  
}