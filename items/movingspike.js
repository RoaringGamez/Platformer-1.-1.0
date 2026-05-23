class MovingSpike{
  constructor(x, y, h, sp, ep, d, speed){
    this.x = x;
    this.y = y;
    this.h = h;
    this.sp = sp;//the start point of the moving platform
    this.ep = ep;//the end point of the mocing platform
    this.d = d;//the direction the platforms moves 1 = up/down, 2=left/right
    this.dir = 1;
    this.speed = speed;
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
    let dt;
    
    if(!lastFramePaused){
      dt = deltaTime / (1000 / 60);
    }else{
      dt = 1;
    }
    
    if(
      player.x+25 > this.x-6 && player.x-25 < this.x+6 && playerAlive &&
      player.y+25 > this.y-(this.h/1.2) && player.y-25 < this.y
    ){
      playerAlive = false;
      player.fallSpeed = -2;
    }
    
    if(this.d === 2){
      
      if(this.x < this.sp){
        this.dir = 1
      }
      
      if(this.x > this.ep){
        this.dir = 2;
      }
      
      if(this.dir === 1){
        this.x += this.speed*dt;
      }
      
      if(this.dir === 2){
        this.x -= this.speed*dt;
      }
      
    }
    
    if(this.d === 1){
      
      if(this.y < this.sp){
        this.dir = 1;
      }
      
      if(this.y > this.ep){
        this.dir = 2;
      }
      
      if(this.dir === 1){
        this.y += this.speed*dt;
      }
      
      if(this.dir === 2){
        this.y -= this.speed*dt;
      }
      
    }
    
  }
  
}