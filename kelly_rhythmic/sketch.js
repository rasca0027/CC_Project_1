var tran = 30;
var easing = 0.3;
var speed = 10;
var triangle_color, circle_color, ellipse_color, small_circle_color;
var sound;
var bar = 20;

// try to play sound, but it's not allowed so I commented it.
/*
function preload() {
  soundFormats('ogg', 'mp3');
  sound = loadSound('back.ogg');
}
*/


function setup() {
  createCanvas(600, 600);  
  background(255);
  // not too fast!
  frameRate(15);
  // initial colors
  triangle_color = color(101, 165, 232, 80);
  ellipse_color = color(255, 104, 200, 100);
  small_circle_color = color(222, 204, 255, 100);
  
  // play backing track, but it's not allowed so I comment it off
  // sound.play();
  
}

function draw() {
  
  // refresh bg each time, so that it won't be overlapping
  background(bar);
  translate(width/2, height/2);
  
  // press keys to rotate the whole thing!!!!
  if (keyIsPressed) {
    if (keyCode == SHIFT) {
      rotate(speed);
      speed += 10;
    } 
    else if (keyCode == TAB) {
      rotate(-speed);
      speed += 10;
    }
  }
  
  // random colors
  noFill();
  if (frameCount % 30 == 0) {
    triangle_color = color(101, 165, 232, 80);
    ellipse_color = color(250, int(random(255)), 104, 100);
    small_circle_color = color(int(random(255)), 204, 255, 100);
  }
  
  // movement
  var diff = 100 - tran;
  tran += easing * (110 - diff);
  if (tran >= 150) { 
    tran = 0;
    bar += 60;
  }
  
  // 4 beats represents 1 bar!
  if (bar >= 255) {
    bar = 20;
  }
  
  // build textures
  for(var i=0; i<12; i++) {
    push();
    rotate(i*TWO_PI/12);
    line(0, 0, 280, 0);
    
    stroke(5);
    ellipse(0, 0, tran+200, tran+200);
    ellipse(0, 0, tran*2, tran*2);
    stroke(1);
 
    translate(tran, 0);
    
    ellipse(0, 0, 50, 50);
    
    fill(triangle_color);
    triangle(70, 0, 20, -20, 20, 20);
    
    fill(ellipse_color);
    ellipse(80, 0, 80, 20);
    
    fill(small_circle_color);
    ellipse(140, 0, 20, 20);
    noFill();
    
    triangle(140, 0, 80, 60, 80, -60);
    
    pop();
    
  } //end for
  
}