function Firework() {
  this.firework = new Particle(random(width), height);
  this.exploded = false;
  
  this.update = function() {
    // actions to take only if firework exists (not null)
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
          
      // point in which before it starts moving downwards
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
      }
    }
  }
  
  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
  }
}
