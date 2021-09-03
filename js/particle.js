function Particle(x, y, firework) {
  this.pos = createVector(x,y);
  
  if (firework) {
    this.vel = createVector(0, random(-10,-2));
  } else {
    this.vel = p5.Vector.random2D();
  }
  
  this.acc = createVector(0,0);
  
  this.applyForce = function(force) {
    this.acc.add(force); 
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.show = function() {
    point(this.pos.x, this.pos.y) // draws particle
  }
}
