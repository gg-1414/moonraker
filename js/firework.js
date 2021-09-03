function Firework() {
  this.firework = new Particle(random(width), height);

  this.update = function() {
    // actions to take only if firework exists (not null)
    if (this.firework) {
      this.firework.applyForce(gravity);
      this.firework.update();
          
      // point in which before it starts moving downwards
      if (this.firework.vel.y >= 0) {
        this.firework = null;
      }
    }
  }
  
  this.show = function() {
    if (this.firework) {
      this.firework.show();
    }
  }
}
