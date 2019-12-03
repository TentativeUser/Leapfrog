function CarLane(parent) {
  var counter = 0;
  var road = null;
  var carSpeed = 9;
  var keysType = 0;
  var player = null;
  var bullet = null;
  var roadObj = null;
  var opponents = [];
  var opponent = null;
  var gameLoop = null;
  var currentScore = 0;
  var screenInfos = null;
  var bulletOnScreen = false;
  var highScore = localStorage.getItem('highScore') || 0;

  function createBackground() {
    roadObj = new Road(parent);
    roadObj.createElement();
    road = roadObj.getHTMLElement();
  }
  function createPlayer() {
    player = new Player(road).init();
    player.create();
  }
  function createOpponent() {
    var rand = new Random().getRandInt();
    if (rand === 1) {
      opponent = new Opponent(road).init();
      opponent.create();
      opponents.push(opponent);
    }
  }
  function carCollides() {
    opponents.forEach(function(value, index) {
      if (player.collides(value)) {
        clearInterval(gameLoop);
        var ele = player.getHTMLElement();
        playerCar = player.getPlayerCar();
        ele.classList.remove(playerCar);
        ele.classList.add(playerCar + '_crash');
        document.removeEventListener('keydown', keydown);
        var screenOver = new ScreenOver(road).init();
        var restartLink = screenOver.getRestartLink();
        restartLink.addEventListener('click', function(event) {
          event.preventDefault();
          roadObj.update(0);
          road.removeChild(screenOver.getScreen());
          while (road.hasChildNodes()) {
            road.removeChild(road.lastChild);
          }
          opponents.length = 0;
          opponents = [];
          currentScore = 0;
          screenInfos = new ScreenInfo(parent).init();
          screenInfos.updateInfo(keysType);
          createPlayer();
          screenInfos.updateScore(
            highScore,
            currentScore,
            player.getBulletCount()
          );
          update();
          eventListeners();
        });
      }
    });
  }
  function bulletHits() {
    var i = null;
    var opp = null;
    opponents.forEach(function(value, index) {
      if (bullet.collides(value)) {
        opp = value;
        bullet.getHTMLElement().classList.add('explode');
        setTimeout(function() {
          value.removeSelf();
          bullet.removeSelf();
          bullet = null;
        }, 100);
        player.setBulletCount(0);
        bulletOnScreen = false;
        opponents.splice(index, 1);
        currentScore++;
      }
    });
  }
  function keydown(event) {
    if (keysType === 'wasd') {
      switch (event.keyCode) {
        case 65:
          player.moveLeft();
          player.draw();
          break;
        case 68:
          player.moveRight();
          player.draw();
          break;
        //up
        case 87:
          if (player.getBulletCount() === 1) {
            bullet = player.makeBullet();
            bulletOnScreen = true;
            setTimeout(function() {
              player.setBulletCount(1);
            }, 2500);
          }
          break;
        //down
        case 83:
          break;
        default:
          break;
      }
      player.draw();
    }
    if (keysType === 'arrow') {
      switch (event.keyCode) {
        case 37:
          player.moveLeft();
          player.draw();
          break;
        case 39:
          player.moveRight();
          player.draw();
          break;
        //up
        case 38:
          if (player.getBulletCount() === 1) {
            bullet = player.makeBullet();
            bulletOnScreen = true;
            setTimeout(function() {
              player.setBulletCount(1);
            }, 2500);
          }
          break;
        //down
        case 40:
          break;
        default:
          break;
      }
    }
  }
  function eventListeners() {
    document.addEventListener('keydown', keydown);
  }
  function update() {
    gameLoop = setInterval(function() {
      roadObj.update();
      counter++;
      opponents.forEach(function(value, index) {
        value.moveDown(carSpeed);
      });
      carCollides();
      if (opponents.length !== 0 && opponents[0].getY() >= window.innerHeight) {
        opponents[0].removeSelf();
        opponents.splice(0, 1);
        currentScore++;
      }
      if (counter % 35 === 0) {
        createOpponent();
      }
      if (bulletOnScreen) {
        player.moveBullet();
        if (player.getBullet().getY() <= 0) {
          player.getBullet().removeSelf();
          bulletOnScreen = false;
        } else {
          bulletHits();
        }
      }
      if (counter % 10 === 0) {
        carSpeed += 3;
      }
      if (highScore < currentScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
      }
      screenInfos.updateScore(highScore, currentScore, player.getBulletCount());
    }, 20);
  }

  this.init = function() {
    createBackground();
    var screenKeys = new ScreenKeys(road).init();
    var anchorWASD = screenKeys.getLinkWASD();
    var anchorArrow = screenKeys.getLinkArrow();
    anchorWASD.addEventListener('click', function(event) {
      event.preventDefault();
      road.removeChild(screenKeys.getHTMLElement());
      keysType = 'wasd';
      screenInfos = new ScreenInfo(parent).init();
      screenInfos.updateInfo(keysType);
      createPlayer();
      screenInfos.updateScore(highScore, currentScore, player.getBulletCount());
      update();
      eventListeners();
    });
    anchorArrow.addEventListener('click', function(event) {
      event.preventDefault();
      road.removeChild(screenKeys.getHTMLElement());
      keysType = 'arrow';
      screenInfos = new ScreenInfo(parent).init();
      screenInfos.updateInfo(keysType);
      createPlayer();
      screenInfos.updateScore(highScore, currentScore, player.getBulletCount());
      update();
      eventListeners();
    });
  };
}
