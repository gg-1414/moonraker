var fireworks = [];
var gravity;

function setup() {
  createCanvas(400, 300);
  gravity = createVector(0,0.2); // gravity points down, so it should be positive.
  stroke(255);
  strokeWeight(4);
  firework = new Particle(random(width), height);
}

function draw() {
  // background(0);
  background(0, 25); // gives it alpha (opacity) 25/255
  
  // 10% chance of making a new firework every frame
  if (random(1) < 0.03) {
    fireworks.push(new Firework()); 
  }
  
  for (let i = fireworks.length-1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  
  console.log(fireworks.length)
}

