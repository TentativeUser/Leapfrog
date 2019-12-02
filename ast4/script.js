(function() {
  /**
   * Helper class that provides with helpful functions
   */
  function Helper() {
    var trees = ['tree1', 'tree2'];
    var vehicle = [
      'simple_car_blue',
      'simple_car_green',
      'simple_car_orange',
      'simple_car_purple',
      'simple_car_red',
      'simple_car_yellow'
    ];
    var lanes = ['left', 'center', 'right'];

    var playerCars = [
      'taxi',
      'police',
      'car',
      'black_viper',
      'audi',
      'ambulance'
    ];

    /**
     * Gives a random number between a range
     * @param {number} min minimum number
     * @param {number} max maximum number
     * @returns {number} random number between min and max
     */
    this.getRandInt = function(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    };
    /**
     * Gives a tree type from a tree type array
     * @returns {string} a random string from tree type array
     */
    this.getTree = function() {
      return trees[this.getRandInt(0, trees.length - 1)];
    };
    /**
     * Gives a vehicle type from a vehicle type array
     * @returns {string} a random string from vehicle type array
     */
    this.getVehicle = function() {
      return vehicle[this.getRandInt(0, vehicle.length - 1)];
    };
    /**
     * Gives a lane type from a lane type array
     * @returns {string} a random string from lane type array
     */
    this.getLane = function() {
      return lanes[this.getRandInt(0, lanes.length - 1)];
    };
    /**
     * Gives a player type from a player type array
     * @returns {string} a random string from player type array
     */
    this.getPlayer = function() {
      return playerCars[this.getRandInt(0, playerCars.length - 1)];
    };
  }

  /**
   * Object structure that acts as an abstract class for inheritance
   * Used for opponent, player and tree objects
   */
  function SimpleObject(parent) {
    var x = 0;
    var y = 0;
    var width = 100;
    var height = 100;
    var element = null;
    var parentElement = parent;

    this.getX = function() {
      return x;
    };
    this.getY = function() {
      return y;
    };
    this.setX = function(val) {
      x = val;
    };
    this.setY = function(val) {
      y = val;
    };
    this.setPosition = function(posX, posY) {
      x = posX;
      y = posY;
    };
    this.getWidth = function() {
      return width;
    };
    this.getHeight = function() {
      return height;
    };
    this.setWidth = function(val) {
      width = val;
    };
    this.setHeight = function(val) {
      height = val;
    };
    this.getParent = function() {
      return parentElement;
    };
    this.getHTMLElement = function() {
      return element;
    };
    this.draw = function() {
      element.style.top = y + 'px';
      element.style.left = x + 'px';
    };
    this.overlaps = function(object) {
      return (
        this.getX() < object.getX() + object.getWidth() &&
        this.getX() + this.getWidth() > object.getX() &&
        this.getY() < object.getY() + object.getHeight() &&
        this.getY() + this.getHeight() > object.getY()
      );
    };
    this.createObject = function(type) {
      element = document.createElement('div');
      element.style.top = y + 'px';
      element.style.left = x + 'px';
      if (type == 'tree') {
        element.classList.add(new Helper().getTree());
      } else {
        element.classList.add('cars');
      }
      parentElement.appendChild(element);
    };
  }

  function Vehicle(parent) {
    var CENTER_LANE_CENTER = parent.offsetWidth / 2;
    var LEFT_LANE_CENTER = CENTER_LANE_CENTER - 115;
    var RIGHT_LANE_CENTER = CENTER_LANE_CENTER + 115;
    var elementWidth = 0;
    var boundLeft = 0;
    var boundRight = 0;
    var boundCenter = 0;

    this.checkBoundary = function() {
      if (this.getX() < boundLeft) {
        this.setX(boundLeft);
      }
      if (this.getX() > boundRight) {
        this.setX(boundRight);
      }
      this.draw();
    };

    this.reAlignDimension = function() {
      elementWidth = this.getWidth();
      boundLeft = LEFT_LANE_CENTER - elementWidth / 2;
      boundRight = RIGHT_LANE_CENTER - elementWidth / 2;
      boundCenter = CENTER_LANE_CENTER - elementWidth / 2;
    };

    this.setLane = function(type) {
      switch (type) {
        case 'left':
          this.setX(boundLeft);
          break;
        case 'right':
          this.setX(boundRight);
          break;
        case 'center':
          this.setX(boundCenter);
        default:
          break;
      }
      this.draw();
    };

    this.moveLeft = function() {
      var left = this.getX() - 115;
      this.setX(left);
    };
    this.moveRight = function() {
      var left = this.getX() + 115;
      this.setX(left);
    };

    this.init = function() {
      SimpleObject.call(this, parent);
      return this;
    };
  }
  Vehicle.prototype = Object.create(SimpleObject.prototype);
  Vehicle.prototype.constructor = Vehicle;

  function Tree(parent) {
    this.init = function() {
      SimpleObject.call(this, parent);
      return this;
    };
  }
  Tree.prototype = Object.create(Tree.prototype);
  Tree.prototype.constructor = Tree;

  function Background(container) {
    var MAX_HEIGHT = container.offsetHeight;
    var MAX_WIDTH = container.offsetWidth;
    // 180 is (total-road-width / 2)
    var LEFT_X = MAX_WIDTH / 2 - 180;
    var RIGHT_X = MAX_WIDTH / 2 + 180;
    var moved = 0;
    function createTrees(treeEachSide) {
      for (var i = 0; i < treeEachSide; i++) {
        var tree = new Tree(container).init();
        tree.createObject('tree');
        var posX = LEFT_X - 150;
        var posY = Math.round((MAX_HEIGHT * i) / treeEachSide);
        tree.setPosition(posX, posY);
        tree.draw();
      }
      for (var i = 0; i < treeEachSide; i++) {
        var tree = new Tree(container).init();
        tree.createObject('tree');
        var posX = RIGHT_X + 150 - tree.getWidth();
        var posY = Math.round((MAX_HEIGHT * i) / treeEachSide);
        tree.setPosition(posX, posY);
        tree.draw();
      }
    }
    function createRoad() {
      var roadblocks = document.createElement('div');
      roadblocks.classList.add('roadblocks');
      roadblocks.style.left = LEFT_X + 'px';
      var road = document.createElement('div');
      road.classList.add('road');
      road.style.left = 10 + 'px';
      var dividerOne = document.createElement('div');
      dividerOne.classList.add('divider');
      dividerOne.style.left = 110 + 'px';
      var dividerTwo = document.createElement('div');
      dividerTwo.classList.add('divider');
      dividerTwo.style.left = 225 + 'px';
      road.appendChild(dividerOne);
      road.appendChild(dividerTwo);
      roadblocks.appendChild(road);
      container.appendChild(roadblocks);
    }

    this.move = function(pixels) {
      if (pixels) {
        moved += pixels;
      } else {
        moved++;
      }
      container.style.top = moved + 'px';
    };
    this.init = function(treeEachSide) {
      createTrees(treeEachSide);
      createRoad();
      return this;
    };
  }

  function Game() {
    var container = null;
    var background = [];
    var opponents = [];
    var moved = 0;
    var bgNode = null;
    var bgHeight = 0;
    var bgMultiples = 2;
    var helperObj = new Helper();
    var playerType = null;
    var player = null;
    var highscore = 0;
    var currentScore = 0;
    var speed = 5;

    function createBackground() {
      for (var i = 0; i < bgMultiples; i++) {
        bgNode = document.createElement('div');
        bgNode.classList.add('background');
        container.appendChild(bgNode);
        var bgObject = new Background(bgNode).init(25);
        background.push(bgNode);
        bgNode.style.top = -i * window.innerHeight + 'px';
      }
      bgNode = background[0].cloneNode(true);
      container.appendChild(bgNode);
      bgNode.style.top = -i * window.innerHeight + 'px';
      bgHeight = bgNode.offsetHeight;
    }

    function createOpponents() {
      var numOfOpponents = localStorage.getItem('perLane');
      for (var i = 0; i < (bgMultiples + 1) * bgHeight; i++) {
        if (i > 450 && i % 400 == 0) {
          if (numOfOpponents == 3) numOfOpponents = helperObj.getRandInt(1, 2);
          for (var j = 0; j < numOfOpponents; j++) {
            var oppCar = new Vehicle(container).init();
            oppCar.createObject();
            var element = oppCar.getHTMLElement();
            playerType = helperObj.getVehicle();
            element.classList.add(playerType);
            oppCar.setWidth(element.offsetWidth);
            oppCar.setHeight(element.offsetHeight);
            oppCar.getHTMLElement().style.transform = 'rotate(' + 180 + 'deg)';
            oppCar.reAlignDimension();
            oppCar.setY(-i);
            oppCar.setLane(helperObj.getLane());
            opponents.push(oppCar);
          }
        }
      }
    }

    function createPlayer() {
      player = new Vehicle(container).init();
      player.createObject();
      var element = player.getHTMLElement();
      if (localStorage.getItem('playerCar')) {
        playerType = localStorage.getItem('playerCar');
      } else {
        playerType = helperObj.getPlayer();
      }
      element.classList.add(playerType);
      player.setWidth(element.offsetWidth);
      player.setHeight(element.offsetHeight);
      player.setY(window.innerHeight - element.offsetHeight - 20);
      player.reAlignDimension();
      player.setLane('center');
    }

    function scoreBoard() {
      highscore = localStorage.getItem('highScore');
      if (!highscore) highscore = 0;
      var scoreDiv = document.createElement('div');
      scoreDiv.classList.add('score');
      scoreDiv.innerHTML =
        `<h2>High Score: <span id="high">` +
        highscore +
        `</span></h2>
        <h2>Current Score: <span id="score">` +
        currentScore +
        `</span></h2>`;
      container.appendChild(scoreDiv);
    }

    function eventListeners() {
      document.addEventListener('keydown', function(event) {
        // left
        if (event.keyCode === 65 || event.keyCode === 37) {
          player.moveLeft();
          player.checkBoundary();
          player.draw();
        }
        // right
        if (event.keyCode === 68 || event.keyCode === 39) {
          player.moveRight();
          player.checkBoundary();
          player.draw();
        }
        // up
        if (event.keyCode === 87 || event.keyCode === 38) {
        }
        // down
        if (event.keyCode === 83 || event.keyCode === 40) {
        }
      });
    }

    function update() {
      moved += 10;
      var scoreSpan = document.getElementById('score');
      var highSpan = document.getElementById('high');
      opponents.forEach(function(value, index) {
        var move = value.getHTMLElement().offsetTop + speed;
        var offset = 140;
        move = move % ((bgHeight - offset) * (bgMultiples + 1));
        value.setY(move);
        value.draw();
      });
      opponents.forEach(function(value) {
        if (value.overlaps(player)) {
          var element = player.getHTMLElement();
          element.classList.remove(playerType);
          element.classList.add(playerType + '_crash');
          clearInterval(interval);
          setTimeout(function() {
            window.location.href = './index.html';
          }, 1000);
        }
      });
      opponents.forEach(function(value, index) {
        if (
          value.getY() > player.getY() - speed &&
          player.getY() >= value.getY()
        ) {
          currentScore++;
          scoreSpan.innerText = currentScore;
          if (highscore < currentScore) {
            highscore = currentScore;
            highSpan.innerText = highscore;
          }
          if (currentScore % 10 == 0) {
            speed += 3;
            moved += 10;
          }
          localStorage.setItem('highScore', highscore);
        }
      });
      background.forEach(function(value, index) {
        var move = -index * bgHeight;
        value.style.top = move + (moved % (bgHeight * bgMultiples)) + 'px';
      });
      var move = -bgMultiples * bgHeight;
      bgNode.style.top = move + (moved % (bgHeight * bgMultiples)) + 'px';
    }

    var interval = setInterval(update, 15);

    this.init = function() {
      container = document.getElementById('app');
      createBackground();
      createOpponents();
      createPlayer();
      eventListeners();
      scoreBoard();
    };
  }

  var game = new Game().init();
})();
