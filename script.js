var cnv;
var ship;
let score = 0;
var asteroids = [];
var shots = [];
var numAsteroids = 10;
let frames = 0;
var rotation = 0.1;
var maxSpeed = 6;
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  ship = new Ship();
  for (let i = 0; i < numAsteroids; i++) {
    asteroids.push(new Asteroid(random(width), random(height), random(20, 50)));
  }
}

function keyPressed() {
    if (keyIsDown(32)) {
        shots.push(new Shot(p5.Vector.fromAngle(ship.heading), ship.pos.x, ship.pos.y));
    }
}

function draw() {
  if (frames >= 600) {
    console.log(shots);
    frames = 0;
  }
  if (frames == 300) {
    asteroids.push(new Asteroid(random(width), 0, random(30, 50)));
  }
 
  background(0);
  checkTurn();
  ship.checkBounds();
  ship.render();
  ship.move();

  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].checkEdges();
    asteroids[i].render();
    asteroids[i].update();
  }

  let shotsToRemove = [];
  for (let i = shots.length-1; i >= 0; i--) {
    shots[i].render();
    shots[i].update();
    if (shots[i].offscreen()) {
      shots.splice(i, 1);
    } else {
    for (let j = asteroids.length-1; j >= 0; j--) {
      if (shots[i].hits(asteroids[j])) {
        if (asteroids[j].r < 30) {
          asteroids.splice(j, 1);
          score += 25;
          shots.splice(i, 1);
          break;
        }
        var newAsteroids = asteroids[j].breakup();
        if (newAsteroids) {
          asteroids.push(newAsteroids[0]);
          asteroids.push(newAsteroids[1]); 
        }
        asteroids.splice(j, 1);
        shots.splice(i, 1);
        break;
      }
    }
  }
  }
  // shotsToRemove.pop()
  stroke(255);
  fill(255);
  textSize(16);
  text(score, 10, height/2);
  frames++;
}

window.onresize = () => {
  resizeCanvas(windowWidth, windowHeight);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
};
