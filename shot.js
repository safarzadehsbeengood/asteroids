function Shot(vel, x, y) {
    this.pos = createVector(x, y);
    this.vel = vel.mult(10);

    this.update = function() {
        this.pos.add(this.vel);
    }
    this.render = function() {
        push();
        // translate(this.pos.x, this.pos.y);
        strokeWeight(8);
        stroke(255);
        noFill();
        point(this.pos.x, this.pos.y);
        pop();
    }
}