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

  function Ball(parent) {
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
    this.radius = this.height / 2;
    this.centreX = null;
    this.centreY = null;

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
      self.radius = self.height / 2;
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
      self.setCentre();
    };
    this.setCentre = function() {
      self.centreX = self.x + self.radius;
      self.centreY = self.y + self.radius;
    };
    this.overlaps = function(ball) {
      var dx = self.centreX - ball.centreX;
      var dy = self.centreY - ball.centreY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var totalRadius = self.radius + ball.radius + 2;

      return distance < totalRadius;
    };
    this.checkBoundary = function(width, height) {
      if (self.x < 0 || self.x > width - self.width) {
        self.directionX *= -1;
      }
      if (self.y < 0 || self.y > height - self.height) {
        self.directionY *= -1;
      }
    };

    this.detectCollision = function(balls) {
      balls.forEach(function(value) {
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
      var ball = document.createElement('div');
      ball.style.height = self.height + 'px';
      ball.style.width = self.width + 'px';
      ball.style.backgroundColor = new Helper().getColor();
      ball.classList.add('ball');
      parent.appendChild(ball);
      self.element = ball;

      return this;
    };
  }

  function Game(selector, count) {
    var gameContainer;
    var ballCount;
    var balls = [];
    var helperObj = new Helper();
    var MAX_WIDTH;
    var MAX_HEIGHT;

    function checkOverlap(box) {
      for (var i = 0; i < balls.length; i++) {
        if (box !== balls[i]) {
          if (box.overlaps(balls[i])) {
            return true;
          }
        }
      }
      return false;
    }

    function createBoxes() {
      for (var i = 0; i < ballCount; i++) {
        var ball = new Ball(gameContainer).init();
        var dim = helperObj.getRandomInt(20, 30);
        ball.setDimension(dim, dim);
        ball.setDirection(
          helperObj.getRandomSignedUnity(),
          helperObj.getRandomSignedUnity()
        );
        do {
          var posX = helperObj.getRandomInt(0, MAX_WIDTH - ball.width);
          var posY = helperObj.getRandomInt(0, MAX_HEIGHT - ball.height);
          ball.setPosition(posX, posY);
          ball.setCentre();
        } while (checkOverlap(ball));
        ball.setSpeed(
          helperObj.getRandomSignedUnity(),
          helperObj.getRandomSignedUnity()
        );
        ball.setCentre();
        ball.draw();
        balls.push(ball);
      }
    }
    function moveBoxes() {
      balls.forEach(function(element) {
        element.move();
        element.detectCollision(balls);
        element.checkBoundary(MAX_WIDTH, MAX_HEIGHT);
        element.draw();
      });
    }
    this.init = function() {
      gameContainer = document.getElementById(selector);
      gameContainer.style.width = 500 + 'px';
      gameContainer.style.height = 500 + 'px';
      ballCount = count;
      MAX_WIDTH = gameContainer.clientWidth;
      MAX_HEIGHT = gameContainer.clientHeight;
      createBoxes();
      setInterval(moveBoxes, 16);
      // var start = new Date();
      // requestAnimationFrame(function animate() {
      //   var timeFraction = new Date() - start;
      //   if (timeFraction > 1) {
      //     moveBoxes();
      //   }
      //   requestAnimationFrame(animate);
      // });
    };
  }
  new Game('ballcontainer', 10).init();
})();
