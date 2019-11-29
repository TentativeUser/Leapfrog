(function() {
  function Helper() {
    var colors = ['red', 'blue', 'green', 'yellow', 'aqua'];
    this.getColor = function() {
      var index = this.getRandomInt(0, colors.length);
      return colors[index];
    };
    this.getRandomInt = function(max, min) {
      return Math.round(Math.random() * (max - min) + min);
    };
    this.getRandomSignedUnity = function() {
      return Math.random() < 0.5 ? -1 : 1;
    };
  }

  function Box(parent) {
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

    this.init = function() {
      var box = document.createElement('div');
      box.style.height = self.height + 'px';
      box.style.width = self.width + 'px';
      box.style.backgroundColor = new Helper().getColor();
      box.classList.add('box');
      parent.appendChild(box);
      self.element = box;

      return this;
    };
  }

  function Game(selector, count) {
    var gameContainer;
    var boxCount;
    var boxes = [];
    var helperObj = new Helper();
    var MAX_WIDTH;
    var MAX_HEIGHT;

    function checkOverlap(box) {
      for (var i = 0; i < boxes.length; i++) {
        if (box !== boxes[i]) {
          if (box.overlaps(boxes[i])) {
            return true;
          }
        }
      }
      return false;
    }

    function createBoxes() {
      for (var i = 0; i < boxCount; i++) {
        var box = new Box(gameContainer).init();
        var dim = helperObj.getRandomInt(20, 30);
        box.setDimension(dim, dim);
        box.setDirection(
          helperObj.getRandomSignedUnity(),
          helperObj.getRandomSignedUnity()
        );
        do {
          var posX = helperObj.getRandomInt(0, MAX_WIDTH - box.width);
          var posY = helperObj.getRandomInt(0, MAX_HEIGHT - box.height);
          box.setPosition(posX, posY);
        } while (checkOverlap(box));
        box.setSpeed(
          helperObj.getRandomSignedUnity(),
          helperObj.getRandomSignedUnity()
        );
        box.draw();
        boxes.push(box);
      }
    }
    function moveBoxes() {
      boxes.forEach(function(element) {
        element.move();
        element.detectCollision(boxes);
        element.checkBoundary(MAX_WIDTH, MAX_HEIGHT);
        element.draw();
      });
    }
    this.init = function() {
      gameContainer = document.getElementById(selector);
      gameContainer.style.width = 500 + 'px';
      gameContainer.style.height = 500 + 'px';
      boxCount = count;
      MAX_WIDTH = gameContainer.clientWidth;
      MAX_HEIGHT = gameContainer.clientHeight;
      createBoxes();

      var start = new Date();
      // setInterval(moveBoxes, 16);
      requestAnimationFrame(function animate() {
        var timeFraction = new Date() - start;
        if (timeFraction > 60) moveBoxes();
        requestAnimationFrame(animate);
      });
    };
  }
  new Game('container', 10).init();
})();
