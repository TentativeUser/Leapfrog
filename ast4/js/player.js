function Player(parent) {
  var lane = '';
  var bullet = null;
  var bulletCount = 1;
  var playerCar = '';
  var helperObj = new Random();
  this.getPlayerCar = function() {
    return playerCar;
  };
  this.getBullet = function() {
    return bullet;
  };
  this.getBulletCount = function() {
    return bulletCount;
  };
  this.setBulletCount = function(val) {
    bulletCount = val;
  };
  this.create = function() {
    this.createObject();
    playerCar = localStorage.getItem('playerCar');
    if (playerCar) {
      playerCar = playerCar;
    } else {
      playerCar = helperObj.getPlayer();
    }
    this.getHTMLElement().classList.add(playerCar);
    this.reAlignDimension();
    this.setY(parent.offsetHeight - this.getHeight() - 20);
    lane = this.getLane();
    this.setLane(lane);
    this.draw();
  };
  this.makeBullet = function() {
    bullet = new Bullet(parent).init();
    bullet.create();
    bullet.setY(parent.offsetHeight - this.getHeight() - 20 - 50);
    bullet.setLane(this.getLane());
    bullet.draw();
    bulletCount--;
    return bullet;
  };
  this.moveBullet = function() {
    bullet.moveUp();
  };
  this.init = function() {
    SimpleObject.call(this, parent);
    return this;
  };
}
Player.prototype = Object.create(SimpleObject.prototype);
Player.prototype.constructor = Player;
