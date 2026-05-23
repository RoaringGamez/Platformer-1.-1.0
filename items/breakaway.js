class Breakaway{
  
  constructor(x, y, w, h, t){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 
    this.t = t*60;
    this.triggered = false;
    this.fallSpeed = 0;
    this.ogX = this.x;
    this.ogY = this.y;
    this.ogT = this.t;
  }
  
  show(){
    let x = this.x;
    let y = this.y;
    let w = this.w;
    let h = this.h;
    
    fill(97, 61, 0);
    rect(x+1, y+1, w-1, h-1);
    noStroke();
    fill(138, 85, 0);
    triangle(x+1, y+1, x+w-1, y+1, x+1, y+h-1);
    stroke(0);
    fill(0);
    rect(x+1, y, w-1, 1);
    rect(x+1, y+h, w-1, 1);
    rect(x, y+1, 1, h-1);
    rect(x+w, y+1, 1, h-1);

    if(w > 20 && h > 20){
        stroke(0, 0, 0);
        fill(51, 51, 51);
        rect(x+5, y+5, 3, 3);
        rect(x+5, y+11, 3, 3);
        rect(x+11, y+5, 3, 3);
        stroke(0);
    }
    
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
      player.y+25 > this.y-12 && player.y+25 < this.y+3 && this.t > 0
    ){
      groundHeight = this.y;
      
    }
    
    if(
      player.x+25 > this.x && player.x-25 < this.x+this.w &&
      player.y+25 > this.y-5 && player.y+25 < this.y+1 && this.t > 0
    ){
      
      if(!this.triggered){
        this.triggered = true;
        //print('triggered');
      }
      
    }
    
    if(this.triggered){
      
      if(this.t > 0){
        this.t-=1*dt;
        this.x += random(-0.7, 0.7)*dt;
        //print('shaking');
      }
      
      if(this.t <= 0 && this.y < 650){
        this.y += this.fallSpeed*dt;
        this.fallSpeed += 0.2*dt;
      }
      
      if(!playerAlive && player.y > 650){
        this.x = this.ogX;
        this.y = this.ogY;
        this.t = this.ogT;
        this.triggered = false;
        this.fallSpeed = 0;
      }
      
    }
    
    
  }
  
}