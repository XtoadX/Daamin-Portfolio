const gameCode = 173134283;

const scale = 1;

const PLAYER_INVINCIBLE = 60;

let MOVE_INTERVAL = 10;
let minShootTime = 120,
  maxShootTime = 200;

let player;
let playerDamage,
  playerMoveSpeed,
  playerBulletSpeed,
  playerFireRate,
  playerLives;

let invaders = [];
let invaderHealth, amountPerRow;
let ufos = [];
let shields = [];
let bullets = [],
  invaderBullets = [];

let invY = [];
let shieldX = [];

let invaderImg,
  invader2Img,
  ufoImg,
  spaceshipImg,
  backgroundImg,
  bulletImg,
  invaderBulletImg;
let shootSound,
  invaderShootSound,
  playerHitSound,
  invaderDeathSound,
  invaderHitSound,
  loseSound,
  winSound,
  battleSound,
  backgroundSound,
  buttonClickSound;

let win, lose;
let scoreM = 1;

let score = 0;
let input, button;
let dificultyLevel = 1;
let frameCount = 0;

let ps = [];
let shakeing = false;
let shake = {
  x: 0,
  y: 0,
};
let damageUpgradesAmount = 0,
  healthUpgradesAmount = 0,
  moveSpeedUpgradesAmount = 0,
  bulletSpeedUpgradesAmount = 0,
  fireRateUpgradesAmount = 0;
let maxDamageUpgrades = 5,
  maxHealthUpgrades = 5,
  maxMoveSpeedUpgrades = 5,
  maxBulletSpeedUpgrades = 5,
  maxFireRateUpgrades = 5;

let tween;

function preload() {
  spaceshipImg = loadImage("./assets/img/spaceShip.png");
  invaderImg = loadImage("./assets/img/alienInvader_1.png");
  invader2Img = loadImage("./assets/img/alienInvader_2.png");
  ufoImg = loadImage("./assets/img/ufo.png");
  shieldImg = loadImage("./assets/img/shield_1.png");
  shieldImg2 = loadImage("./assets/img/shield_2.png");
  shieldImg3 = loadImage("./assets/img/shield_3.png");

  backgroundImg = loadImage("./assets/img/spaceBackground.jpg");
  playScreenBackgroundImg = loadImage("./assets/img/play.gif");

  bulletImg = loadImage("./assets/img/bullet.png");
  invaderBulletImg = loadImage("./assets/img/bullet_invader.png");
  shootSound = loadSound("./assets/sound/retro-laser.mp3");
  invaderShootSound = loadSound("./assets/sound/retro-laser-2.mp3");
  playerHitSound = loadSound("./assets/sound/retro-hurt.mp3");
  invaderDeathSound = loadSound("./assets/sound/explosion.mp3");
  invaderHitSound = loadSound("./assets/sound/inv_hurt.mp3");
  loseSound = loadSound("./assets/sound/game-over-arcade.mp3");
  winSound = loadSound("./assets/sound/game-win-level.mp3");
  battleSound = loadSound("./assets/sound/game-music.mp3");
  backgroundSound = loadSound("./assets/sound/back_music.mp3");
  buttonClickSound = loadSound("./assets/sound/menu-button.mp3");
  myFont = loadFont("./assets/fonts/PressStart2P-Regular.ttf");
  noLoop();
}

function setup() {
  noLoop();
  backgroundSound.loop();
  score = 0;
  dificultyLevel = 1;
  removeElements();
  createCanvas(
    Math.min(800, window.innerWidth),
    Math.min(600, window.innerWidth)
  );
  background(backgroundImg);
  button = createButton("SPACE ADVENTURE");
  button.position(width / 3.7, height / 10);
  button.attribute("disabled", true);
  button.addClass("textButton");

  button = createButton("Play");
  button.addClass("playButton");
  button.position(width / 5, height / 3);
  button.mousePressed(() => {
    selectDiffScreen();
    buttonClickSound.play();
  });
  // button = createButton("Leaderboard");
  // button.addClass("leaderButton");
  // button.position(width / 5, height / 3 + button.height + 15);
  // button.mousePressed(async () => {
  //   await getScores();
  //   buttonClickSound.play();
  // });
  button = createButton("How To Play");
  button.addClass("guideButton");
  button.position(width / 5, height / 3 + button.height + 15);
  button.mousePressed(() => {
    howToScreen();
    buttonClickSound.play();
  });
  (damageUpgradesAmount = 0),
    (healthUpgradesAmount = 0),
    (moveSpeedUpgradesAmount = 0),
    (bulletSpeedUpgradesAmount = 0),
    (fireRateUpgradesAmount = 0);
}

function playScreen() {
  win = false;
  lose = false;
  invaders = [];
  ufos = [];
  shields = [];
  bullets = [];
  invaderBullets = [];
  frameCount = 0;
  removeElements();
  // MAKE PLAYER
  player = new Player(
    width / 2,
    height - spaceshipImg.height * scale,
    spaceshipImg.width * scale,
    spaceshipImg.height * scale,
    spaceshipImg
  );
  let waveConfigs = makeWave(dificultyLevel);
  invaderSpawn(waveConfigs, amountPerRow);
  shielSpawn();
  // tweening();
  backgroundSound.stop();
  battleSound.loop();
  loop();
}

function upgradeScreen() {
  setTimeout(() => {
    win = false;
    lose = false;
    clear();
    removeElements();
    createCanvas(
      Math.min(800, window.innerWidth),
      Math.min(600, window.innerWidth)
    );
    noSmooth();
    background(backgroundImg);
    button = createButton("Upgrades");
    button.position(width / 3, 50);
    button.attribute("disabled", true);
    button.addClass("textButton");

    button = createButton(
      `+ Damage (${damageUpgradesAmount}/${maxDamageUpgrades})`
    );
    button.position(width / 6, height / 4);
    button.addClass("damageTextButton");
    if (damageUpgradesAmount >= maxDamageUpgrades) {
      button.attribute("disabled", true);
    }
    button.mousePressed(() => {
      if (damageUpgradesAmount < maxDamageUpgrades) {
        damageUpgradesAmount++;
        playerDamage++;
        buttonClickSound.play();
        removeElements();
        nextRound();
      }
    });

    button = createButton(
      `+ Health (${healthUpgradesAmount}/${maxHealthUpgrades})`
    );
    button.position(width / 6, height / 4 + 70 * 1);
    button.addClass("healthTextButton");
    if (healthUpgradesAmount >= maxHealthUpgrades) {
      button.attribute("disabled", true);
    }
    button.mousePressed(() => {
      if (healthUpgradesAmount < maxHealthUpgrades) {
        healthUpgradesAmount++;
        playerLives++;
        buttonClickSound.play();
        removeElements();
        nextRound();
      }
    });

    button = createButton(
      `+ Move Speed (${moveSpeedUpgradesAmount}/${maxMoveSpeedUpgrades})`
    );
    button.position(width / 6, height / 4 + 70 * 2);
    button.addClass("speedTextButton");
    if (moveSpeedUpgradesAmount >= maxMoveSpeedUpgrades) {
      button.attribute("disabled", true);
    }
    button.mousePressed(() => {
      if (moveSpeedUpgradesAmount < maxMoveSpeedUpgrades) {
        moveSpeedUpgradesAmount++;
        playerMoveSpeed = Math.min(playerMoveSpeed + 5, 30);
        buttonClickSound.play();
        removeElements();
        nextRound();
      }
    });

    button = createButton(
      `+ Bullet Speed (${bulletSpeedUpgradesAmount}/${maxBulletSpeedUpgrades})`
    );
    button.position(width / 6, height / 4 + 70 * 3);
    button.addClass("bSpeedTextButton");
    if (bulletSpeedUpgradesAmount >= maxBulletSpeedUpgrades) {
      button.attribute("disabled", true);
    }
    button.mousePressed(() => {
      if (bulletSpeedUpgradesAmount < maxBulletSpeedUpgrades) {
        bulletSpeedUpgradesAmount++;
        playerBulletSpeed = Math.min(playerBulletSpeed + 0.3, 3);
        buttonClickSound.play();
        removeElements();
        nextRound();
      }
    });

    button = createButton(
      `+ Fire Rate (${fireRateUpgradesAmount}/${maxFireRateUpgrades})`
    );
    button.position(width / 6, height / 4 + 70 * 4);
    button.addClass("fireTextButton");
    if (fireRateUpgradesAmount >= maxFireRateUpgrades) {
      button.attribute("disabled", true);
    }
    button.mousePressed(() => {
      if (fireRateUpgradesAmount < maxFireRateUpgrades) {
        fireRateUpgradesAmount++;
        playerFireRate = Math.max(playerFireRate - 1, 3);
        buttonClickSound.play();
        removeElements();
        nextRound();
      }
    });
  }, 3000);
}
function selectDiffScreen() {
  removeElements();
  button = createButton("Choose Difficulty");
  button.position(width / 4, 50);
  button.attribute("disabled", true);
  button.addClass("textButton");

  button = createButton("Easy");
  button.position(width / 3, height / 3);
  button.addClass("easyTextButton");
  button.mousePressed(() => {
    setDifficulty("easy");
    buttonClickSound.play();
  });

  button = createButton("Normal");
  button.position(width / 3, height / 2);
  button.addClass("normalTextButton");
  button.mousePressed(() => {
    setDifficulty("normal");
    buttonClickSound.play();
  });

  button = createButton("Hard");
  button.position(width / 3, height / 1.5);
  button.addClass("hardTextButton");
  button.mousePressed(() => {
    setDifficulty("hard");
    buttonClickSound.play();
  });
  button = createButton("Main Menu");
  button.addClass("mainButton");
  button.position(0, height - button.height - 30);
  button.mousePressed(() => {
    setup();
    buttonClickSound.play();
  });
}

function setDifficulty(diff) {
  if (diff == "easy") {
    playerLives = 5;
    playerDamage = 2;
    playerMoveSpeed = 20;
    playerBulletSpeed = 1.8;
    playerFireRate = 8;
    amountPerRow = 8;
    invaderHealth = 1;
    MOVE_INTERVAL = 12;
  }
  if (diff == "normal") {
    playerLives = 3;
    playerDamage = 1;
    playerMoveSpeed = 15;
    playerBulletSpeed = 1.5;
    playerFireRate = 10;
    amountPerRow = 10;
    invaderHealth = 1;
    MOVE_INTERVAL = 10;
  }
  if (diff == "hard") {
    playerLives = 1;
    playerDamage = 1;
    playerMoveSpeed = 10;
    playerBulletSpeed = 1.2;
    playerFireRate = 12;
    amountPerRow = 10;
    invaderHealth = 2;
    MOVE_INTERVAL = 8;
    scoreM = 3;
  }
  playScreen();
}

function draw() {
  // LIMITING FRAMERATE\
  frameRate(15);
  frameCount++;
  background(playScreenBackgroundImg);
  playScreenBackgroundImg.play();
  checkInvadersWallHit();
  checkAllCollisions();
  deadDeletion();

  // UPDATING OBJECTS
  updateDrawGame();
  player.update(frameCount);
  player.draw();

  keyboardControls();
  checkWinLose();
  fill(255);
  textFont(myFont);
  textSize(24);
  textAlign(LEFT, TOP);
  text(`Lives ${playerLives}`, 0, 0);
  fill(255);
  textFont(myFont);
  textSize(24);
  textAlign(RIGHT, TOP);
  text(`Score: ${score}`, width, 0);
  fill(255);
  textFont(myFont);
  textSize(24);
  textAlign(CENTER, TOP);
  text(`Wave ${dificultyLevel}`, width / 2, 0);
}

function updateDrawGame() {
  for (let bullet of bullets) {
    bullet.update(frameCount);
    bullet.draw();
  }
  for (let bullet of invaderBullets) {
    bullet.update(frameCount);
    bullet.draw();
  }

  // DRAWING OBJECTS

  for (let shield of shields) {
    shield.update(frameCount);
    shield.draw();
  }
  for (let ufo of ufos) {
    ufo.update(frameCount);
    ufo.draw();
  }
  for (let invader of invaders) {
    invader.update(frameCount);
    invader.draw();
  }
  for (let p of ps) {
    p.update();
    p.draw();
  }
}
function deadDeletion() {
  bullets = bullets.filter(
    (bullet) => !bullet.deadMarked && bullet.lower() >= 0
  );
  invaderBullets = invaderBullets.filter(
    (bullet) => !bullet.deadMarked && bullet.upper() <= height
  );
  invaders = invaders.filter((invader) => !invader.deadMarked);
  ufos = ufos.filter((ufo) => !ufo.deadMarked);
  shields = shields.filter((shield) => !shield.deadMarked);
}
function checkAllCollisions() {
  // CHECK BULLETS AND PLAYER COLLISION
  for (let bullet of invaderBullets) {
    bullet.update(frameCount);
    if (!player.invincible && player.intersects(bullet)) {
      bullet.deadMarked = true;
      playerHitSound.play();
      ps.push(new System(bullet.pos.x + 5, bullet.pos.y, "invHit", 7));
      hit();
    }
    bullets.forEach((bullet_) => {
      if (bullet_ !== bullet && bullet_.intersects(bullet)) {
        bullet.deadMarked = true; // INVADER BULLET
        bullet_.deadMarked = true; // PLAYER BULLET
      }
    });
  }
  // CHECK BULLETS AND ALIEN COLLISION
  for (let invader of invaders) {
    bullets.forEach((bullet) => {
      if (bullet.intersects(invader)) {
        invader.health -= bullet.damage;
        invaderHitSound.play();
        screenShake();
        if (invader.health <= 0) {
          Math.min((score += 10 * scoreM));
          if (invader.img === invader2Img) score += 10;
          invaderDeathSound.play();
          ps.push(
            new System(invader.pos.x + 30, invader.pos.y + 20, "kill", 40)
          );
          invader.deadMarked = true;
        } else {
          ps.push(new System(bullet.pos.x, bullet.pos.y, "playerHit", 7));
        }
        bullet.deadMarked = true;
      }
    });
  }
  // CHECK BULLETS AND UFO COLLISION
  for (let ufo of ufos) {
    bullets.forEach((bullet) => {
      if (bullet.intersects(ufo)) {
        score += 100;
        bullet.deadMarked = true;
        ufo.deadMarked = true;
      }
    });
  }
  // CHECK BULLETS AND SHIELD COLLISION
  for (let shield of shields) {
    bullets.forEach((bullet) => {
      if (bullet.intersects(shield)) {
        bullet.deadMarked = true;
        shield.health = shield.health - 1;
        playerHitSound.play();
        ps.push(new System(bullet.pos.x, bullet.pos.y, "playerHit", 7));
        screenShake();
      }
    });
    invaderBullets.forEach((bullet_) => {
      if (bullet_.intersects(shield)) {
        bullet_.deadMarked = true;
        shield.health = shield.health - 1;
        playerHitSound.play();
        ps.push(new System(bullet_.pos.x + 5, bullet_.pos.y, "invHit", 7));
        screenShake();
      }
    });
    invaders.forEach((invader) => {
      if (invader.intersects(shield)) {
        invader.deadMarked = true;
        shield.health = shield.health - 1;
        invaderDeathSound.play();
        ps.push(
          new System(invader.pos.x + 30, invader.pos.y + 20, "playerHit", 15)
        );
        screenShake();
      }
    });
  }
}
function checkInvadersWallHit() {
  if (
    invaders.some((invader) => invader.right() >= width || invader.left() <= 0)
  )
    invaders.forEach((invader) => {
      invader.pos.add(p5.Vector.mult(invader.vel, -1));
      invader.pos.y += 50;
      invader.vel.x = -invader.vel.x;
    });

  if (ufos.some((ufo) => ufo.left() >= width || ufo.right() <= 0))
    ufos.forEach((ufo) => {
      ufo.deadMarked = true;
    });
}
function keyboardControls() {
  if (keyIsDown(LEFT_ARROW)) {
    player.move(true);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.move(false);
  }

  if (keyIsDown(32)) {
    player.shoot();
  }
}
function checkWinLose() {
  if (invaders.length == 0) {
    win = true;
  }
  if (playerLives < 0) {
    playerLives = 0;
    lose = true;
  }
  // CHECK IF INVADER HIT BOTTOM
  if (invaders.some((invader) => invader.upper() >= height)) {
    lose = true;
  }
  if (win) {
    score += playerLives * 100;
    winSound.play();
    winText();
    upgradeScreen();
    noLoop();
  }
  if (lose) {
    battleSound.stop();
    loseSound.play();
    loseText();
    noLoop();
  }
}
// function tweening() {
//   for (let invader of invaders) {
//     p5.tween.manager
//       .addTween(invader.pos, "tween1")
//       .addMotion("y", invY[invaders.indexOf(invader)], 3000, "easeOutQuad")
//       .startTween();
//   }
//   for (let shield of shields) {
//     tween = p5.tween.manager
//       .addTween(shield.pos, "tween2")
//       .addMotion("x", shieldX[shields.indexOf(shield)], 3000, "easeOutQuad")
//       .startTween(5000);
//   }

//   let tween3 = p5.tween.manager
//     .addTween(player.pos, "tween3")
//     .addMotion("y", height - spaceshipImg.height * scale, 3000, "easeOutQuad")
//     .startTween()
//     .pause()
//     .restart();
//   tween3.resume();
// }

function createBullet(x, y, img) {
  bulletPrefab = new Sprite(x, y, img.width * scale, img.height * scale, img);
  bulletPrefab.vel = createVector(0, -scale * 15);
  bulletPrefab.deadMarked = false;
  bulletPrefab.update = function updateBullet() {
    this.pos.add(this.vel);
  };
  return bulletPrefab;
}

function hit() {
  playerLives--;
  //MAKE PLAYER INVINCIBLE
  player.invincible = true;
}

// function restart() {
//   redraw();
//   noLoop();

//   setTimeout(() => {
//     playerLives = 3;
//     score = 0;
//     win = false;
//     lose = false;
//     invaders = [];
//     ufos = [];
//     shields = [];
//     bullets = [];
//     invaderBullets = [];
//     frameCount = 0;
//     player.pos.x = width / 2;
//     removeElements();
//     playScreen();
//   }, 3000);
// }
function nextRound() {
  redraw();
  noLoop();

  setTimeout(() => {
    battleSound.stop();
    win = false;
    lose = false;
    invaders = [];
    ufos = [];
    shields = [];
    bullets = [];
    invaderBullets = [];
    ps = [];
    frameCount = 0;
    player.pos.x = width / 2;
    dificultyHigher();
    removeElements();
    playScreen();
  }, 3000);
}

function loseText() {
  fill(255, 0, 0);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(64);
  text("YOU LOSE", width / 2, height / 4);
  fill(255, 255, 255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Score: ${score}`, width / 2, height / 3);
  input = createInput().attribute("placeholder", "Enter Your Name");
  input.position(width / 2 - input.width / 2, height / 2 - input.height);
  input.style("placeHolder", "Submit you name");
  button = createButton("Submit");
  button.position(width / 3, height / 1.8);
  button.mousePressed(async () => {
    if (score > 0 && input.value().length > 0) await postScores();
    await getScores();
    buttonClickSound.play();
  });
  // button = createButton("Restart");
  // button.addClass("playButton");
  // button.position(width / 3, height / 1.4);
  // button.mousePressed(async () => {
  //   restart();
  // });
  button = createButton("Main Menu");
  button.addClass("mainButton");
  button.position(width / 3, height / 1.4);
  button.mousePressed(async () => {
    setup();
  });
}

function winText() {
  textAlign(RIGHT, TOP);
  fill(win ? 0 : 255, 255, win ? 0 : 255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("Wave Complete", width / 2, height / 3);
  fill(255, 255, 255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Score: ${score}`, width / 2, height / 2);
}

function invaderSpawn(waveConfigs, amountPerRow) {
  let invWidth = scale * invaderImg.width,
    invHeight = scale * invaderImg.height;

  let x = -(scale * 5 + invWidth) + scale,
    y = scale;

  for (let rowIndex = 0; rowIndex < waveConfigs.length; ++rowIndex) {
    let isShooterRow = waveConfigs[rowIndex].canShoot;
    let health = invaderHealth + waveConfigs[rowIndex].extraHealth;

    for (let i = 0; i < Math.min(amountPerRow, 10); ++i) {
      x += scale * 5 + invWidth;

      if (x >= invWidth * Math.min(amountPerRow, 10)) {
        y += scale * 2 + invHeight;
        x = scale;
      }
      invY.push(y);
      invaders.push(
        new Invader(
          x,
          y,
          invWidth,
          invHeight,
          isShooterRow ? invader2Img : invaderImg,
          isShooterRow,
          health
        )
      );
    }
  }
}

function ufoSpawn(frames) {
  setTimeout(() => {
    let ufoWidth = scale * ufoImg.width,
      ufoHeight = scale * ufoImg.height;

    let x = -(scale * 5 + ufoWidth) + scale,
      y = scale;
    x += scale * 5 + ufoWidth;
    y += scale * 2 + ufoHeight;
    x = scale;

    ufos.push(
      new Ufo(x, y + floor(random(0, 200)), ufoWidth, ufoHeight, ufoImg)
    );

    let rn = floor(random(500, 900));
    ufoSpawn(rn);
  }, frames * 100);
}

function shielSpawn() {
  // MAKE INVADERS
  let shieldWidth = scale * shieldImg.width,
    shieldHeight = scale * shieldImg.height;

  let x = -(scale * 5 + shieldWidth) + scale,
    y = height / 1.5,
    yidx = 0;

  for (let i = 0; i < 4; ++i) {
    x += shieldWidth + 50;
    if (x >= width - shieldWidth) {
      y += scale * -2 + shieldHeight;
      yidx++;
      x = scale;
    }
    shieldX.push(x);
    shields.push(
      new Shield(
        x,
        y,
        shieldWidth,
        shieldHeight,
        shieldImg,
        shieldImg2,
        shieldImg3
      )
    );
  }
}

async function getScores() {
  clear();
  removeElements();
  createCanvas(
    Math.min(800, window.innerWidth),
    Math.min(600, window.innerWidth)
  );
  noSmooth();
  background(backgroundImg);
  fill(255, 255, 255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(64);
  text("LEADERBOARD", width / 2, 70);
  let api_url_get_score = `https://oege.ie.hva.nl/gd/blok1/highscore/load.php?game=${gameCode}`;
  await httpGet(api_url_get_score, "json", false, function (response) {
    response.sort((a, b) => b.score - a.score);
    const topTenScores = Math.min(response.length, 8);
    for (let i = 0; i < topTenScores; i++) {
      fill(255, 255, 255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text(
        `Name: ${response[i].name} Score: ${response[i].score}`,
        width / 2,
        130 + i * 50
      );
    }
  });

  button = createButton("Main Menu");
  button.addClass("mainButton");
  button.position(0, height - button.height - 30);
  button.mousePressed(() => {
    setup();
    buttonClickSound.play();
  });
}

async function postScores() {
  let api_url_post_score = `https://oege.ie.hva.nl/gd/blok1/highscore/save.php?game=${gameCode}&name=${input.value()}&score=${int(
    score
  )}`;
  await httpGet(api_url_post_score, "json", false, function () {});
}

function makeWave(dificulty) {
  let config = [];
  switch (true) {
    case dificulty == 2:
      config = [
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 1 },
      ];
      break;
    case dificulty == 3:
      config = [
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 0 },
        { canShoot: false, extraHealth: 0 },
      ];
      break;
    case dificulty == 4:
      config = [
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 1 },
        { canShoot: false, extraHealth: 1 },
      ];
      break;
    case dificulty == 5:
      config = [
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 1 },
        { canShoot: false, extraHealth: 1 },
      ];
      break;
    case dificulty == 6:
      config = [
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 2 },
        { canShoot: false, extraHealth: 2 },
      ];
      break;
    case dificulty == 7:
      config = [
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 1 },
        { canShoot: true, extraHealth: 1 },
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 1 },
      ];
      break;
    case dificulty == 8:
      config = [
        { canShoot: true, extraHealth: 1 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 1 },
        { canShoot: false, extraHealth: 1 },
      ];
      break;
    case dificulty == 9:
      config = [
        { canShoot: true, extraHealth: 1 },
        { canShoot: true, extraHealth: 1 },
        { canShoot: true, extraHealth: 1 },
        { canShoot: false, extraHealth: 3 },
        { canShoot: false, extraHealth: 3 },
      ];
      break;
    case dificulty >= 10:
      config = [
        { canShoot: true, extraHealth: 2 },
        { canShoot: true, extraHealth: 2 },
        { canShoot: true, extraHealth: 2 },
        { canShoot: false, extraHealth: 4 },
        { canShoot: false, extraHealth: 4 },
        { canShoot: false, extraHealth: 4 },
      ];
      break;
    default:
      config = [
        { canShoot: false, extraHealth: 0 },
        { canShoot: true, extraHealth: 0 },
        { canShoot: false, extraHealth: 0 },
      ];
  }
  return config;
}
function dificultyHigher() {
  if (dificultyLevel == 2) {
    invaderHealth++;
    Math.min((MOVE_INTERVAL -= 1), 1);
  }
  if (dificultyLevel == 4) {
    Math.min((MOVE_INTERVAL -= 1), 1);
  }
  if (dificultyLevel == 5) {
    invaderHealth++;
    Math.min((MOVE_INTERVAL -= 1), 1);
  }
  if (dificultyLevel == 7) {
    invaderHealth++;
    Math.min((MOVE_INTERVAL -= 1), 1);
  }
  if (dificultyLevel == 9) {
    invaderHealth++;
    Math.min((MOVE_INTERVAL -= 1), 1);
  }
  if (dificultyLevel >= 11) {
    invaderHealth++;
    Math.min((MOVE_INTERVAL -= 0.3), 1);
  }
  dificultyLevel++;
  enemyShootFaster();
}

function enemyShootFaster() {
  minShootTime = Math.max(60, 120 - dificultyLevel * 5);
  maxShootTime = Math.max(100, 200 - dificultyLevel * 10);
}

function howToScreen() {
  removeElements();
  noLoop();
  background(backgroundImg);

  fill(255);
  textSize(32);
  textFont(myFont);
  textAlign(CENTER);
  text("How to Play", width / 2, 100);

  textSize(18);
  textFont(myFont);
  text(
    "Goal: Shoot all the aliens,\n upgrade your ship, and move to the next wave.",
    width / 2,
    200
  );

  textSize(24);
  textFont(myFont);
  text("Controls:", width / 2, 300);
  textFont(myFont);
  text("Left Arrow: Move Left", width / 2, 350);
  textFont(myFont);
  text("Right Arrow: Move Right", width / 2, 400);
  textFont(myFont);
  text("Space: Shoot", width / 2, 450);

  button = createButton("Main Menu");
  button.addClass("mainButton");
  button.position(0, height - button.height - 30);
  button.mousePressed(() => {
    setup();
    buttonClickSound.play();
  });
}

function screenShake() {
  if (!shakeing) {
    shakeing = true;
    let shakeDuration = 300;
    let shakeInterval = 10;
    const shakeIntervalId = setInterval(() => {
      shake.x = floor(random(-5, 5));
      shake.y = floor(random(-5, 5));
    }, shakeInterval);
    setTimeout(() => {
      clearInterval(shakeIntervalId);
      shakeing = false;
      shake.x = 0;
      shake.y = 0;
    }, shakeDuration);
  }
}
