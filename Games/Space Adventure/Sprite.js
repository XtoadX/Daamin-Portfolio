class Sprite {
  constructor(x, y, width, height, img) {
    this.pos = createVector(x, y);
    this.size = createVector(width, height);
    this.img = img;
  }

  corner1() {
    return this.pos.copy();
  }

  corner2() {
    return p5.Vector.add(this.pos, this.size);
  }

  width() {
    return this.size.x;
  }
  height() {
    return this.size.y;
  }
  left() {
    return this.pos.x;
  }
  right() {
    return this.width() + this.left();
  }
  upper() {
    return this.pos.y;
  }
  lower() {
    return this.height() + this.upper();
  }

  intersects(other) {
    return !(
      this.right() < other.left() ||
      other.right() < this.left() ||
      this.lower() < other.upper() ||
      other.lower() < this.upper()
    );
  }

  draw() {
    push();
    image(
      this.img,
      this.left() + shake.x,
      this.upper() + shake.y,
      this.width(),
      this.height()
    );
    pop();
  }
}

class Player extends Sprite {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img);
    this.visible = true;
    this.shootCooldown = 0;
    this.invincibleCounter = 0;
  }

  update(frameCount) {
    this.shootCooldown--;
    this.invincibleCounter--;
    this.visible = this.invincible ? frameCount % 20 >= 20 / 2 : true;
  }

  move(dir) {
    if (dir && this.left() > 0) {
      this.pos.set(this.pos.x - playerMoveSpeed, this.pos.y, this.pos.z);
    } else if (!dir && this.right() < width) {
      this.pos.set(this.pos.x + playerMoveSpeed, this.pos.y, this.pos.z);
    }
  }
  shoot() {
    if (this.shootCooldown <= 0) {
      let b = createBullet(
        this.left() + (this.width() / 2 - 5),
        this.lower(),
        bulletImg
      );
      b.damage = playerDamage;
      b.vel.mult(playerBulletSpeed);
      bullets.push(b);
      shootSound.play();
      this.shootCooldown = playerFireRate;
    }
  }

  get invincible() {
    return this.invincibleCounter > 0;
  }
  set invincible(inv) {
    this.invincibleCounter = inv ? PLAYER_INVINCIBLE : 0;
  }

  draw() {
    if (!this.visible) return;
    else super.draw();
  }
}

class Invader extends Sprite {
  constructor(x, y, width, height, img, canShoot, health) {
    super(x, y, width, height, img);
    this.visible = true;
    this.vel = createVector(scale, 0);
    this.health = health;
    // move speed
    this.vel.x = 5;
    this.canShoot = canShoot;
    this.timeToShoot = floor(random(minShootTime, maxShootTime));
  }
  update(frameCount) {
    if (frameCount % MOVE_INTERVAL < 1) {
      this.pos.add(this.vel);
    }
    if (this.canShoot) {
      this.timeToShoot--;
      if (this.timeToShoot <= 0) {
        let b = createBullet(
          this.left() + this.width() / 2 - 5,
          this.upper(),
          invaderBulletImg
        );
        b.vel.mult(-0.9);
        invaderBullets.push(b);
        invaderShootSound.play();
        this.timeToShoot = floor(random(120, 200));
      }
    }
  }

  draw() {
    if (!this.visible) return;
    else super.draw();
  }
}

class Ufo extends Sprite {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img);
    this.visible = true;
    this.vel = createVector(scale, 0);
    this.vel.x = 20;
  }
  update(frameCount) {
    if (frameCount) {
      this.pos.add(this.vel);
      this.pos.add(this.vel.y - 10);
    }
  }
  draw() {
    if (!this.visible) return;
    else super.draw();
  }
}

class Shield extends Sprite {
  constructor(x, y, width, height, img, img2, img3) {
    super(x, y, width, height, img);
    this.visible = true;
    this.health = 4;
    this.img2 = img2;
    this.img3 = img3;
  }

  update(frameCount) {
    if (frameCount) {
      if (this.health == 2) {
        this.img = this.img2;
      } else if (this.health == 1) {
        this.img = this.img3;
      } else if (this.health <= 0) {
        this.deadMarked = true;
      }
    }
  }

  draw() {
    if (!this.visible) return;
    else super.draw();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.random2D();
    this.acc.mult(0.55);
    this.life = 255;
    this.deadMarked = false;
    this.hueValue = 0;
  }

  update() {
    this.finished();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.life -= 25;
  }

  enemyKill() {
    noStroke();
    fill(255, 0, 0, this.life);
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

  invbulletHit() {
    noStroke();
    fill(0, this.life, 0, this.life);
    rect(this.pos.x, this.pos.y, 4, 4);
  }

  playerbulletHit() {
    noStroke();
    fill(this.life, 50, 0, this.life);
    rect(this.pos.x, this.pos.y, 4, 4);
  }

  finished() {
    if (this.life <= 0) {
      this.deadMarked = true;
    } else {
      this.deadMarked = false;
    }
  }
}
