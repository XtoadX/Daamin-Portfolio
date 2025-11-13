class System {
  constructor(x, y, type, num) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.particles = [];
    this.num = num;

    for (let i = 0; i < this.num; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  update() {
    for (let p of this.particles) {
      p.update();
    }
    this.particles = this.particles.filter((p) => !p.deadMarked);
  }
  draw() {
    for (let p of this.particles) {
      if (this.type == "kill") {
        p.enemyKill();
      }
      if (this.type == "invHit") {
        p.invbulletHit();
      }
      if (this.type == "playerHit") {
        p.playerbulletHit();
      }
    }
  }
}
