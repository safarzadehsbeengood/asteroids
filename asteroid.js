function Asteroid(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.r = r;
    this.total = floor(random(15, 25));
    this.rValues = [];
    for (let i = 0; i < this.total; i++) {
        this.rValues[i] = this.r + random(-5, 5);
    }

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(255);
        // if (this.r > 25) {
        //     fill(0, 255, 0);
        // } if (this.r > 10 && this.r <= 25) {
        //     fill(200, 0, 0);
        // }
        fill(100);
        // ellipse(0, 0, this.r * 2);
        beginShape();
        for (let i = 0; i < this.total; i++) {
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var x = this.rValues[i]*cos(angle);
            var y = this.rValues[i]*sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    this.checkEdges = function() {
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
    }

    this.breakup = function(){
        let newAsts = [];
        newAsts.push(new Asteroid(this.pos.x, this.pos.y, this.r/2));
        newAsts.push(new Asteroid(this.pos.x, this.pos.y, this.r/2));
        return newAsts;
    }

    this.update = function() {
        this.pos.add(this.vel);
    }
}