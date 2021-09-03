/*
  *
  *   github.com/emrebicer
  *
*/


// Check url parameters
var textToDisplay = gup('text') ? decodeURIComponent(gup('text')) : "example <3";
let fullscreen = gup('fs') ;
if(fullscreen){
  var canvasWidth = window.screen.width;
  var canvasHeight = window.screen.height;
}
else{
  var canvasWidth = 800;
  var canvasHeight = 600;
}
var fireworks = [];
var particles = [];
var counter = 0;
var newFireworksTime = 50;
var points;
var bounds;
var textClearCounter = 500;
var clearness = 400;

let font;
function preload() {
  font = loadFont('./Avenir.otf');
}

function setup(){

  createCanvas(canvasWidth,canvasHeight);
  noStroke();
  newText();
}

function draw(){
  background(40,40,40,25);
  newText();


  counter++;
  if(counter%newFireworksTime == 0){
    counter = 0;
    newFireworksTime = Math.floor(Math.random() * 30 + 40);
    var fireworksNumber = Math.random() * 5 + 2;
    for(var i = 0;i<fireworksNumber;i++){
      var fire = new firework();
      fireworks.push(fire);
    }
  }

  if (mouseIsPressed) {
   createParticles(pmouseX,pmouseY);
  }

  //Draw the fireworks
  for(var i = 0;i<fireworks.length;i++){
    if(!fireworks[i].exploded){
      fireworks[i].update();
      fireworks[i].show();
    }else{
      //Firework is done destroy the object
      fireworks[i] = null;
      fireworks.splice(i, 1);
    }
  }

  //Draw the particles
  for(var i = 0;i<particles.length;i++){

    if(particles[i].destroy){
      particles[i] = null;
      particles.splice(i, 1);
    }
    else{
      particles[i].update();
      particles[i].show();
    }
  }
}

function newText(){
  fill(200);
  textAlign(CENTER);

  var txt = textToDisplay;
  bounds = font.textBounds(txt, 0, 0, 80);

  points = font.textToPoints(txt, canvasWidth / 2 + bounds.x,canvasHeight / 2  , 80, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });

  //draw
  if(clearness > 1){
    clearness -= 0.5;
  }

  for(var i = 0;i<points.length;i++){
    let randA = Math.random() * 80  ;

    fill(color(255, randA));
    let randX = Math.random() * (clearness*2) - clearness;
    let randY = Math.random() * (clearness*2) - clearness;

    ellipse(points[i].x + randX,points[i].y + randY,5,5);
  }
}


function createParticles(x,y,r,g,b){

  var particleNumber = Math.floor(Math.random() * 15 + 30);
  for(var i = 0;i<particleNumber;i++){
    var randR = Math.floor(Math.random() * 100 - 50) + r;
    var randG = Math.floor(Math.random() * 100 - 50) + g;
    var randB = Math.floor(Math.random() * 100 - 50) + b;

    if(randR > 255){
      randR = 255;
    }
    else if(randR < 0){
      randR = 0;
    }
    if(randG > 255){
      randG = 255;
    }
    else if(randG < 0){
      randG = 0;
    }if(randB > 255){
      randB = 255;
    }
    else if(randB < 0){
      randB = 0;
    }

    var newParticle = new particle(x,y,randR,randG,randB);
    particles.push(newParticle);
  }
}


function particle(x,y,r,g,b){

  this.xPos = x;
  this.yPos = y;
  this.xVel = Math.random() * 5 - 2.5;
  this.yVel = Math.random() * 5 - 2.5;
  this.radius = 4;
  this.R = r;
  this.G = g;
  this.B = b;
  this.destroy = false;
  this.duration = 30;

  this.update = function(){
    if(this.duration > 0){
      this.duration--;
    }
    else{
      this.xVel -= this.xVel/40;
      if(this.yVel > 0){
        this.yVel += 0.01;
      }
      else{
        this.yVel += 0.035;
      }
      if(this.radius > 0){
        this.radius -= 0.04
      }
      else{
        this.destroy = true;
      }
    }

    //Update the position
    this.xPos += this.xVel;
    this.yPos += this.yVel;

  }
  this.show = function(){
    //fill(255);
    //text(this.yVel, this.xPos, this.yPos);
    fill(color(this.R, this.G, this.B));
    ellipse(this.xPos,this.yPos,this.radius,this.radius);
  }

}

function firework(){
  this.xPos = Math.floor(Math.random() * canvasWidth);
  this.yPos = Math.floor(Math.random() * (canvasHeight / 3) +canvasHeight);
  this.xVel = (Math.random() * 6 + -3);
  this.yVel = (Math.random() * 2 + 3);
  this.slowPoint = Math.floor(Math.random() * (canvasHeight*2/3) + canvasHeight/3);
  this.radius = Math.floor(Math.random() * 4 + 3);
  this.exploded = false;
  this.explosionPoint = Math.random() * (-5) + 4;
  this.R = Math.floor(Math.random() * 255);
  this.G = Math.floor(Math.random() * 255);
  this.B = Math.floor(Math.random() * 255);

  this.update = function(){
    //if it is too slow exlode.
    if(this.yVel < this.explosionPoint){
      //Create many particles.
      createParticles(this.xPos,this.yPos,this.R,this.G,this.B);
      //Change the boolean so i can delete this object at the draw function.
      this.exploded = true;
    }

    //if it is really close to top border slow it down.
    if(this.yPos < canvasHeight / 4){
      this.yVel -= this.yVel / 50;
    }

    //if it is really close to left border slow it down.
    if(this.xPos < canvasWidth / 4){
      this.xVel -= this.xVel / 50;
    }

    //if it is really close to right border slow it down.
    if(this.xPos > canvasWidth * 3 / 4){
      this.xVel -= this.xVel / 50;
    }

    //Slow down the firework.
    if(this.slowPoint > this.yPos ){
      if(this.yVel > 0.2){
        this.yVel -= this.yVel/100;
      }
      else{
        this.yVel -= 0.04;
      }
    }
    this.xPos = this.xPos - this.xVel;
    this.yPos = this.yPos - this.yVel;
  }
  this.show = function(){
    fill(color(this.R, this.G, this.B));
    ellipse(this.xPos,this.yPos,this.radius,this.radius);
  }
}


function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}