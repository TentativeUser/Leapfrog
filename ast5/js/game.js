function Games(selector, numInstances) {
  var container = document.getElementById(selector);
  var body = document.body;
  var h1 = document.createElement('h1');
  h1.innerText = 'Flappy Bird';
  h1.style.padding = '10px';
  h1.style.fontFamily = `'Helvetica', sans-serif`;
  h1.style.color = '#ffffff';
  body.insertBefore(h1, container);
  this.init = function() {
    for (var i = 0; i < numInstances; i++) {
      var contain = document.createElement('div');
      contain.style.display = 'inline-block';
      container.appendChild(contain);
      new Game(contain).init();
    }
  };
}
function Game(element) {
  var width = GAMEWIDTH;
  var height = 512;
  var bgObj = null;
  var bgElement = null;
  var gameDiv = null;
  var birdObj = null;
  var moved = 0;
  var highScore = localStorage.getItem('highScore') || 0;
  var currentScore = 0;
  var pipe = null;
  var pipes = [];
  var startBtn = document.createElement('button');
  var intervalId;
  var scoreDiv = null;

  var createElement = () => {
    var gameWrapper = document.createElement('div');
    gameWrapper.style.width = width + 100 + 'px';
    gameWrapper.style.display = 'inline-block';
    gameDiv = document.createElement('div');
    gameDiv.style.width = width + 'px';
    gameDiv.style.height = height + 'px';
    gameDiv.style.margin = '0 auto';
    gameDiv.style.position = 'relative';
    gameDiv.style.overflow = 'hidden';
    gameDiv.style.backgroundImage = 'url(images/bg1.png)';
    bgObj = new Background(gameDiv);
    bgElement = bgObj.createObject();
    gameWrapper.appendChild(gameDiv);
    element.appendChild(gameWrapper);
  };
  var createBird = () => {
    birdObj = new Bird(gameDiv);
    birdObj.x = gameDiv.offsetWidth / 2;
    birdObj.y = GAMEHEIGHT / 2;
    birdObj.width = 34;
    birdObj.height = 26;
    birdObj.init();
  };
  var createStart = () => {
    startBtn.style.position = 'absolute';
    startBtn.style.bottom = '130px';
    startBtn.style.left = '108px';
    startBtn.style.width = '104px';
    startBtn.style.height = '58px';
    startBtn.style.border = 0;
    startBtn.style.background = 'url(images/play.png) transparent';
    gameDiv.appendChild(startBtn);
  };
  var spaceActionListener = event => {
    var keyCode = event.keyCode;
    if (keyCode == 32) {
      if (birdObj.playing) {
        birdObj.moveUp();
      }
    }
  };
  var update = () => {
    bgObj.update();
    birdObj.update();
    moved++;
    if (moved % 90 === 0) {
      pipe = new Pipes(gameDiv);
      pipe.createPipes();
      pipes.push(pipe);
    }
    pipes.forEach(value => {
      value.update();
    });
    if (pipes.length !== 0 && pipes[0]) {
      if (pipes[0].x + pipes[0].width <= 0) {
        pipes[0].removeSelf();
        pipes.splice(0, 1);
        currentScore++;
        console.log(currentScore);
      }
      checkCollision();
    }
    checkBoundary();
  };

  var checkBoundary = () => {
    if (birdObj.y + birdObj.height > GAMEHEIGHT) {
      birdObj.changeImage();
      var fallDown = setInterval(function() {
        birdObj.fallDown();
      }, 10);
      clearInterval(intervalId);
      setTimeout(() => {
        this.resetGame();
        clearInterval(fallDown);
      }, 3000);
    }
  };

  var checkCollision = () => {
    pipes.forEach(value => {
      if (
        birdObj.x < value.x + value.width &&
        birdObj.x + birdObj.width > value.x
      ) {
        if (birdObj.y < value.yTopPipe || birdObj.y > value.yBottomPipe) {
          birdObj.changeImage();
          counter = 0;
          var fallDown = setInterval(function() {
            birdObj.fallDown();
          }, 10);
          document.removeEventListener('keydown', spaceActionListener);
          startBtn.removeEventListener('click', clickActionListener);
          clearInterval(intervalId);
          setTimeout(() => {
            this.resetGame();
            clearInterval(fallDown);
          }, 3000);
        }
      }
    });
  };

  this.resetGame = () => {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
    this.init();
  };

  var clickActionListener = event => {
    gameDiv.removeChild(startBtn);
    document.addEventListener('keydown', spaceActionListener);
    intervalId = setInterval(update, 30);
  };

  this.init = () => {
    createElement();
    createBird();
    createStart();
    startBtn.addEventListener('click', clickActionListener);
  };
}

new Games('flappy', 2).init();
