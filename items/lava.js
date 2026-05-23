class Lava{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.allLava = [];
  }
  
  show(){
    fill('#FF3600');
    rect(this.x, this.y, this.w ,this.h);
    fill('#FF230F');
    noStroke();
    rect(this.x, this.y, this.w ,6);
    fill('#FF4310');
    rect(this.x, this.y+6, this.w ,3)
    stroke(0);
    
    fill(0);
    rect(this.x, this.y, this.w, 2);
    rect(this.x, this.y+this.h-2, this.w, 2);
    rect(this.x-2, this.y+2, 2, this.h-4);
    rect(this.x+this.w, this.y+2, 2, this.h-4);
  }
  
  checkCollision(){
    
    if(this.w > 30 && this.h > 25){
      
      if(this.allLava.length < 50){
        this.allLava.push(new LavaBubble(
          random(this.x+10, this.x+this.w-10),
          random(this.y+10, this.y+this.h-10),
          random(-0.1, 0.1),
          random(-0.1, 0.1),
          random(2, 7)
        ))
      }//make lava bubbles
      
      for(let i = 0; i < this.allLava.length; i++){
        this.allLava[i].show();
        this.allLava[i].move();
        
        if(this.allLava[i].x < this.x+10){
          this.allLava[i].x = this.x+10
          this.allLava[i].d1 = random(-0.1, 0.1);
        }
        
        if(this.allLava[i].x > this.x+this.w-10){
          this.allLava[i].x = this.x+this.w-10
          this.allLava[i].d1 = random(-0.1, 0.1);
        }
        
        if(this.allLava[i].y < this.y+10){
          this.allLava[i].y = this.y+10
          this.allLava[i].d2 = random(-0.1, 0.1);
        }
        
        if(this.allLava[i].y > this.y+this.h-10){
          this.allLava[i].y = this.y+this.h-10
          this.allLava[i].d2 = random(-0.1, 0.1);
        }
        
        
      }
      
      
    }
    
    if(
      player.x+25 > this.x && player.x-25 < this.x+this.w &&
      player.y+25 > this.y && player.y-25 < this.y+this.h && playerAlive
    ){
      playerAlive = false;
      player.fallSpeed = -2;
    }
    
  }
  
}