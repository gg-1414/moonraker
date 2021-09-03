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
  background(51);
  fireworks.push(new Firework());
  for (var i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].show();
  }
}
