class Laser{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  show(){
    strokeWeight(6);
    stroke('#D91F11');
    line(this.x, this.y, this.x+this.w, this.y+this.h);
    strokeWeight(2);
    stroke('#EC5347');
    line(this.x, this.y-1, this.x+this.w, this.y+this.h-1);
    strokeWeight(1);
    stroke(0);
  }
  
  checkCollision(){
    if(
      player.x+25 > this.x-2 && player.x-25 < this.x+this.w+2 && 
      player.y+25 > this.y-3 && player.y-25 < this.y+this.h+3 && playerAlive
    ){
      playerAlive = false;
      player.fallSpeed = -2;
    }
  }
  
}