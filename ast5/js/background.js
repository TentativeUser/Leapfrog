const GAMEHEIGHT = 382;
const GAMEWIDTH = 320;
function getRandInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Background(parent) {
  this.y = GAMEHEIGHT;
  this.posX = 0;
  this.element = null;
  this.parent = parent;
  this.createObject = () => {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = '100%';
    this.element.style.height = '130px';
    this.element.style.top = this.y + 'px';
    this.element.style.background = 'url(images/ground.png) repeat-x';
    parent.appendChild(this.element);
  };
  this.update = () => {
    this.posX -= 2;
    this.element.style.backgroundPositionX = this.posX + 'px';
  };
}

function Bird(parent) {
  this.x = 0;
  this.y = 0;
  this.dy = 0.9;
  this.moved = 0;
  var bird = null;
  this.width = 50;
  this.height = 50;
  this.playing = 1;
  // this.element = bird;

  var createObject = () => {
    bird = document.createElement('div');
    bird.style.position = 'absolute';
    bird.style.width = this.width + 'px';
    bird.style.height = this.height + 'px';
    bird.style.left = this.x - 10 + 'px';
    bird.style.top = this.y + 'px';
    bird.style.backgroundImage = 'url(images/rbird.gif)';
    parent.appendChild(bird);
  };

  var gravityEffect = () => {
    this.y = this.y + this.dy;
    bird.style.top = this.y + 'px';
  };

  this.moveUp = () => {
    var up = 100;
    if (this.y < 50) {
      up = 20;
    } else if (this.y < 100) {
      up = 30;
    } else {
      up = 40;
    }
    this.y = this.y - up;
    bird.style.top = this.y + 'px';
  };

  this.update = () => {
    gravityEffect();
    if (this.y < 0) {
      this.y += 10;
    } else if (this.y >= GAMEHEIGHT) {
      this.playing = 0;
    }
    return this.playing;
  };

  this.init = () => {
    createObject();

    return this;
  };
}
