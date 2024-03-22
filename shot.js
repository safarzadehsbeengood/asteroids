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
    this.hits = function(asteroid) {
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < asteroid.r) {
            console.log("HIT");
            return true;
        }
        return false;
    }

    this.offscreen = function() {
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            return true;
        } else {
            return false;
        }
    }
}