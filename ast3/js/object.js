function SimpleObject(parent) {
  var self = this;
  this.x = null;
  this.y = null;
  this.height = 20;
  this.width = 20;
  this.speedX = 1;
  this.speedY = 1;
  this.directionX = 1;
  this.directionY = 1;
  this.element = null;

  this.draw = function() {
    self.element.style.left = self.x + 'px';
    self.element.style.top = self.y + 'px';
  };
  this.setPosition = function(posX, posY) {
    self.x = posX;
    self.y = posY;
  };
  this.setDimension = function(width, height) {
    self.width = width;
    self.height = height;
    self.element.style.height = self.height + 'px';
    self.element.style.width = self.width + 'px';
  };
  this.setSpeed = function(speedX, speedY) {
    self.speedX = speedX;
    self.speedY = speedY;
  };
  this.setDirection = function(directionX, directionY) {
    self.directionX = directionX;
    self.directionY = directionY;
  };
  this.move = function() {
    self.x += self.speedX * self.directionX;
    self.y += self.speedY * self.directionY;
  };
  this.overlaps = function(box) {
    return (
      self.x <= box.x + box.width &&
      self.x + self.width >= box.x &&
      self.y <= box.y + box.height &&
      self.y + self.height >= box.y
    );
  };
  this.checkBoundary = function(width, height) {
    if (self.x <= 0 || self.x >= width - self.width) {
      self.directionX *= -1;
    }
    if (self.y <= 0 || self.y >= height - self.height) {
      self.directionY *= -1;
    }
  };

  this.detectCollision = function(boxes) {
    boxes.forEach(function(value) {
      if (value !== self) {
        if (self.overlaps(value)) {
          self.directionX *= -1;
          value.directionX *= -1;
          self.directionY *= -1;
          value.directionY *= -1;
        }
      }
    });
  };
}
