var tran = 30;
var easing = 0.3;
var speed = 10;
var triangle_color, circle_color, ellipse_color, small_circle_color, outer_triangle_color;
var sound;
var bar = 20;
var beat = 0;
var stress = [];

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
  strokeWeight(2);
  
  // not too fast!
  frameRate(15);
  
  // initial colors
  triangle_color = color(101, 165, 232, 80);
  ellipse_color = color(255, 104, 200, 100);
  small_circle_color = color(222, 204, 255, 100);
  outer_triangle_color = color(157, 82, 145, 80);
  
  // initial stress
  for(var i=0;i<=7;i++) {
    stress[i] = [0, 0, i * 45];
  }
  
  // play backing track, but it's not allowed so I comment it off
  // sound.play();
  
}

function draw() {
  
  // refresh bg each time, so that it won't be overlapping
  background(bar);
  
  // notes, before transformation!
  notes_trail(beat);
  
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
  stroke(5);
  if (frameCount % 30 == 0) {
    triangle_color = color(101, int(random(255)), 232, 80);
    ellipse_color = color(250, int(random(255)), 104, 100);
    small_circle_color = color(int(random(255)), 204, 255, 100);
    outer_triangle_color = color(157, 82, int(random(255)), 80);
  }
  
  // movement
  var diff = 100 - tran;
  tran += easing * (110 - diff);
  if (tran >= 150) { 
    tran = 0;
    bar += 60;
    beat ++;
    beat = beat % 4;
    reset_star();
    console.log(beat);
  }
  
  // 4 beats represents 1 bar!
  if (bar >= 255) {
    bar = 20;
  }
  
  // build textures
  for(var i=0; i<12; i++) {
    push();
    rotate(i*TWO_PI/12);
    noFill();
    line(0, 0, 280, 0);
    
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
  
    fill(outer_triangle_color);
    triangle(140, 0, 80, 60, 80, -60);
    noFill();
    
    pop();
  } //end for
  
}


function notes_trail(t) {
  noStroke();
  // stress the beats on every Crotchet
  rectMode(CENTER);
  if (t == 0) {
    push();
    fill(204, 255, 229);
    translate(520, 520);
    rect(0, 0, 40, 40);
    draw_star();
    pop();
  } else if (t == 1) {
    push();
    fill(153, 255, 204);
    translate(80, 520);
    rect(0, 0, 40, 40);
    draw_star();
    pop();
  } else if (t == 2) {
    push();
    fill(102, 255, 178);
    translate(80, 80);
    rect(0, 0, 40, 40);
    draw_star();
    pop();
  } else if (t == 3) {
    push();
    fill(51, 255, 153);
    translate(520, 80);
    rect(0, 0, 40, 40);
    draw_star();
    pop();
  }
    
}

function reset_star() {
  // reset to the original coordinates
  for(var i=0;i<=7;i++) {
    stress[i] = [0, 0, i * 45];
  }
}

function draw_star() {
  // eight directions
  for (var i=0;i<=7;i++) {
    stroke(255, 255, 0);
    strokeWeight(5);
    var degree = radians(stress[i][2]);
    var old_x = stress[i][0];
    var old_y = stress[i][1];
    var new_x = old_x + 10 * cos(degree);
    var new_y = old_y + 10 * sin(degree);
    line(old_x, old_y, new_x, new_y);
    stress[i][0] = new_x;
    stress[i][1] = new_y;
    strokeWeight(2);
    noStroke();
  }
}