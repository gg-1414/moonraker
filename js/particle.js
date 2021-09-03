function Particle(x,y) {
  this.pos = createVector(x,y);
  this.vel = createVector(0, random(-10,-2));
  this.acc = createVector(0,0);
  
  this.applyForce = function(force) {
    this.acc.add(force); 
    /* 
     * Physics notes:
     * force = mass * acc
     * acc = force / mass
     * (mass elimated for simplicity)
     */
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
