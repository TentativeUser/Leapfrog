function Bird(parent) {
  this.x = 0;
  this.y = 0;
  this.dy = 2;
  this.moved = 0;
  var bird = null;
  this.width = 50;
  this.height = 50;
  this.playing = 1;
  this.HTMLelement = bird;

  var createObject = () => {
    bird = document.createElement('div');
    bird.style.position = 'absolute';
    bird.style.width = this.width + 'px';
    bird.style.height = this.height + 'px';
    bird.style.left = this.x - 10 + 'px';
    bird.style.top = this.y + 'px';
    bird.style.zIndex = '10';
    bird.style.backgroundImage = 'url(images/rbird.gif)';
    parent.appendChild(bird);
  };

  var gravityEffect = () => {
    this.dy++;
    this.y = this.y + this.dy;
    bird.style.top = this.y + 'px';
  };

  this.changeImage = () => {
    bird.style.backgroundImage = 'url(images/rbird-dead.png)';
  };
  this.fallDown = () => {
    this.y += 5;
    bird.style.transform = 'rotate(45deg)';
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
