var cnv;
var ship;
var asteroids = [];
var shots = [];
var numAsteroids = 10;
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
        console.log(shots);
    }
}

function draw() {
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

  for (let i = 0; i < shots.length; i++) {
    shots[i].render();
    shots[i].update();
  }

}

window.onresize = () => {
  resizeCanvas(windowWidth, windowHeight);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
};
