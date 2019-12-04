function Games(selector, numInstances) {
  var container = document.getElementById(selector);
  var h1 = document.createElement('h1');
  h1.innerText = 'Flappy Bird';
  h1.style.padding = '10px';
  h1.style.fontFamily = `'Helvetica', sans-serif`;
  h1.style.color = '#ffffff';
  container.appendChild(h1);
  this.init = function() {
    for (var i = 0; i < numInstances; i++) {
      new Game(container).init();
    }
  };
}
function Game(element) {
  var width = GAMEWIDTH;
  var height = 512;
  var bgObj = null;
  var gameDiv = null;
  var birdObj = null;
  var moved = 0;
  var highScore = localStorage.getItem('highScore') || 0;
  var currentScore = 0;
  var pipe = null;
  var pipes = [];
  var startBtn = document.createElement('button');
  var intervalId;

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
    bgObj.createObject();
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
  var actionListener = () => {
    document.addEventListener('keydown', event => {
      var keyCode = event.keyCode;
      if (keyCode == 32) {
        if (birdObj.playing) {
          birdObj.moveUp();
        }
      }
    });
  };
  var update = () => {
    // var continuePlay;
    bgObj.update();
    birdObj.update();
    // if (continuePlay === true) {
    // }
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
      }
      checkCollision();
    }
  };

  var checkCollision = () => {
    pipes.forEach(value => {
      if (
        birdObj.x < value.x + value.width &&
        birdObj.x + birdObj.width > value.x
      ) {
        clearInterval(intervalId);
      }
    });
  };
  this.init = () => {
    createElement();
    createBird();
    createStart();
    startBtn.addEventListener('click', event => {
      gameDiv.removeChild(startBtn);
      actionListener();
      intervalId = setInterval(update, 30);
    });
  };
}

new Games('flappy', 1).init();
