class Wall{
  constructor(x, y, w, h, ns){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ns = ns;//no shading
  }
  
  show(){
    
    
    fill('#969595');
    rect(this.x+1, this.y+1, this.w-1, this.h-1);
    fill(0);
    rect(this.x+1, this.y, this.w-1, 1);
    rect(this.x+1, this.y+this.h, this.w-1, 1);
    rect(this.x, this.y+1, 1, this.h-1);
    rect(this.x+this.w, this.y+1, 1, this.h-1);
    
    
    
    noStroke();
    fill('#696969');
    if(!this.ns){
      triangle(this.x+2, this.y+2, this.x+2, this.y+this.h-1, this.x+this.w-1, this.y+2);
    }
    fill('#D3D3D3');
    stroke('#616060');
    
    
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
    
    if(
      player.x+25 > this.x && player.x-25 < this.x+this.w &&
      player.y+25 > this.y-10 && player.y+25 < this.y+3
    ){
      groundHeight = this.y
    }//hitbox top
    
    if(
      player.x+25 > this.x && player.x-25 < this.x+this.w &&
      player.y-25 > this.y+this.h-3 && player.y-25 < this.y+this.h
    ){
      player.y = this.y+this.h+27;
      if(player.fallSpeed < 0){
        player.fallSpeed = 0;
      }
      
    }//hitbox bottom
    
    if(player.x+25 > this.x && player.x+25 < this.x+10 &&
       player.y+25 > this.y+3 && player.y-25 < this.y+this.h
    ){
       player.x = this.x-26;
    }//hitbox left
    
    if(player.x-25 > this.x+this.w-3 && player.x-25 < this.x+this.w &&
       player.y+25 > this.y+3 && player.y-25 < this.y+this.h
    ){
       player.x = this.x+this.w+26;
    }//hitbox right
    
  }
  
}