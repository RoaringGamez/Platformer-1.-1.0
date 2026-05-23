
class FireBall{
  constructor(X, Y){
    this.X = X;
    this.Y = Y;
  }
  
  show(){
    
    push();
    translate(this.X, this.Y);
    let X = 0;
    let Y = 0;
    
    fill(255, 81, 0);
    strokeWeight(2);
    ellipse(X+1,Y+1,30,30);
    beginShape();
    vertex(X+-3,Y+-13.5);
    vertex(X+13,Y+-14);
    vertex(X+22,Y+-12);
    vertex(X+30,Y+-10);
    vertex(X+22,Y+-7);
    vertex(X+41,Y+-2);
    vertex(X+23,Y+6);
    vertex(X+31,Y+9);
    vertex(X+23,Y+12);
    vertex(X+19,Y+14);
    vertex(X+5,Y+16);
    endShape();

    stroke(255, 135, 71);
    strokeWeight(1.5);
    line(X+-1,Y+-9,X+14,Y+-9);
    line(X+24,Y+-3,X+31,Y+-1);
    line(X+-9,Y+-1,X+-9,Y+5);
    line(X+-4,Y+10,X+-9,Y+5);
    line(X+-4,Y+10,X+2,Y+12);
    noStroke();
    fill(255, 187, 0);
    beginShape();
    vertex(X+-3,Y+-4);
    vertex(X+-5,Y+-2);
    vertex(X+-5,Y+3);
    vertex(X+-3,Y+6);
    vertex(X+3,Y+9);
    vertex(X+12,Y+9);
    vertex(X+8,Y+6);
    vertex(X+18,Y+2);
    vertex(X+10,Y+0);
    vertex(X+14,Y+-3);
    vertex(X+9,Y+-5);
    vertex(X+4,Y+-6);
    vertex(X+-3,Y+-4);
    endShape();

    fill(247, 233, 108);
    ellipse(X+3,Y+1,9,5);
    pop();
  }
  
  checkCollision(){
    
  }
  
}