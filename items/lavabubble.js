class LavaBubble{
  constructor(x, y, d1, d2, s){
    this.x = x;
    this.y = y;
    this.d1 = d1;
    this.d2 = d2;
    this.s = s;
  }
  
  show(){
    fill('#FFA200AA');
    //strokeWeight(2);
    noStroke();
    ellipse(this.x, this.y, this.s, this.s);
    strokeWeight(1);
    stroke(0);
  }
  
  move(){
    let dt;
    
    if(!lastFramePaused){
      dt = deltaTime / (1000 / 60);
    }else{
      dt = 1;
    }
    
    this.x += this.d1*dt;
    this.y += this.d2*dt;
  }
  
}