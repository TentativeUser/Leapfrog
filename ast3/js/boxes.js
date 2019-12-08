function Box(parent) {
  this.init = function() {
    SimpleObject.call(this, parent);
    var box = document.createElement('div');
    box.style.height = self.height + 'px';
    box.style.width = self.width + 'px';
    box.style.backgroundColor = new Helper().getColor();
    box.classList.add('box');
    parent.appendChild(box);
    this.element = box;

    return this;
  };
}
Box.prototype = Object.create(SimpleObject.prototype);
Box.prototype.constructor = Box;

function BoxGame(selector, count) {
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

    setInterval(moveBoxes, 16);
  };
}

new BoxGame('container', 10).init();
