function Firework() {
  this.firework = new Particle(random(width), height, true);
  this.exploded = false;
  this.particles = [];
  
  this.update = function() {
    // actions to take only if firework exists (not null)
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
          
      // point in which before it starts moving downwards
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
    }
  }
  
  this.explode = function() {
    for (let i = 0; i < 100; i++) {
      const p = new Particle(this.firework.pos.x, this.firework.pos.y);
      this.particles.push(p);
    }
  }
  
  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
