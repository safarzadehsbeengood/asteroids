function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(random(-2, 2), random(-2, 2));
  this.accel = createVector();
  this.heading = 0;
  this.r = 20;

  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    stroke(255);
    fill(150);
    let x = this.pos.x;
    let y = this.pos.y;
    triangle(-this.r + 8, this.r, this.r - 8, this.r, 0, -this.r+5);
    pop();
  };

  this.turn = function (angle) {
    this.heading += angle;
  };

  this.move = function () {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.95);
    this.vel.limit(maxSpeed);
  };

  this.checkBounds = function () {
    if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r
    }

    if (this.pos.y > height + this.r) {
        this.pos.y = -this.r
    } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
    }
  };
}

function checkTurn() {
  if (keyIsDown(RIGHT_ARROW)) {
    ship.turn(rotation);
  }
  if (keyIsDown(LEFT_ARROW)) {
    ship.turn(-rotation);
  }
  if (keyIsDown(UP_ARROW)) {
    ship.vel.add(p5.Vector.fromAngle(ship.heading));
  }
  if (keyIsDown(DOWN_ARROW)) {
    ship.vel.sub(p5.Vector.fromAngle(ship.heading));
  }
}
