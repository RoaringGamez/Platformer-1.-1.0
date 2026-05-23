class MovingPlatform{
  constructor(x, y, w, h, sp, ep, d, speed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sp = sp;//the start point of the moving platform
    this.ep = ep;//the end point of the mocing platform
    this.d = d;//the direction the platforms moves 1 = up/down, 2=left/right
    this.dir = 1;
    this.speed = speed;
  }
  
  show(){
    
    fill(255, 175, 5);
    rect(this.x+1, this.y+1, this.w-1, this.h-1);
    fill(0);
    rect(this.x+1, this.y, this.w-1, 1);
    rect(this.x+1, this.y+this.h, this.w-1, 1);
    rect(this.x, this.y+1, 1, this.h-1);
    rect(this.x+this.w, this.y+1, 1, this.h-1);
    
    
    fill(255, 201, 5);
    noStroke();
    triangle(this.x+2, this.y+2, this.x+2, this.y+this.h-1, this.x+this.w-1, this.y+2)
    fill(64, 64, 64);
    stroke(107, 107, 107);
    if(this.w >= 15){
        rect(this.x+5, this.y+5, 3, 3);
    }
    if(this.w >= 20){
        rect(this.x+11, this.y+5, 3, 3);
    }

    if(this.h >= 20){
        rect(this.x+5, this.y+11, 3, 3);
    }
    stroke(0);

    
  }
  
  checkCollision(){
    let dt;
    
    if(!lastFramePaused){
      dt = deltaTime / (1000 / 60);
    }else{
      dt = 1;
    }
    
    if(
      player.x+25 > this.x && player.x-25 < this.x+this.w &&
      player.y+25 > this.y-12 && player.y+25 < this.y+7
    ){
      groundHeight = this.y;
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