function Firework() {
  this.firework = new Particle(random(width), height);
  
  this.update = function() {
    this.firework.applyForce(gravity);
    this.firework.update();
  }
  
  this.show = function() {
    this.firework.show();
  }
}
