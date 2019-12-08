function Games(selector, numInstances) {
  var container = document.getElementById(selector);
  var body = document.body;
  var h1 = document.createElement('h1');
  h1.innerText = 'Flappy Bird';
  h1.style.padding = '10px';
  h1.style.fontFamily = `'Helvetica', sans-serif`;
  h1.style.color = '#ffffff';
  body.insertBefore(h1, container);
  var types = [32, 13];
  this.init = function() {
    for (var i = 0; i < numInstances; i++) {
      var contain = document.createElement('div');
      contain.style.display = 'inline-block';
      container.appendChild(contain);
      new Game(contain, types[i]).init();
    }
  };
}

function Game(element, key) {
  var moved = 0;
  var pipes = [];
  var pipe = null;
  var height = 512;
  var bgObj = null;
  var gameDiv = null;
  var overDiv = null;
  var birdObj = null;
  var scoreDiv = null;
  var keys = key || 32;
  var currentScore = 0;
  var intervalId = null;
  var width = GAMEWIDTH;
  var startBtn = document.createElement('button');
  var highScore = localStorage.getItem('highScore') || 0;

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
    var info = document.createElement('div');
    info.style.color = '#ffffff';
    info.style.fontFamily = `Helvetica, sans-serif`;
    info.style.fontSize = `14px`;
    var use_key = keys === 32 ? 'SpaceBar' : keys === 13 ? 'Enter' : null;
    info.innerHTML = `<h2>Use ${use_key} to move bird.</h2>`;
    bgObj = new Background(gameDiv);
    bgElement = bgObj.createObject();
    gameWrapper.appendChild(gameDiv);
    element.appendChild(gameWrapper);
    element.appendChild(info);
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
  var createScore = () => {
    scoreDiv = document.createElement('div');
    scoreDiv.style.position = 'absolute';
    scoreDiv.style.width = '100%';
    scoreDiv.style.height = '100px';
    scoreDiv.style.top = 10 + 'px';
    scoreDiv.style.left = 0 + 'px';
    scoreDiv.style.fontFamily = `'FlappyScore'`;
    scoreDiv.style.fontSize = '30px';
    scoreDiv.style.color = '#ffffff';
    scoreDiv.innerHTML = '<h2>0</h2>';
    scoreDiv.style.zIndex = '20';
    gameDiv.appendChild(scoreDiv);
  };
  var createGameOver = () => {
    overDiv = document.createElement('div');
    overDiv.style.position = 'absolute';
    overDiv.style.width = '100px';
    overDiv.style.height = '100px';
    overDiv.style.top = '30%';
    overDiv.style.left = '110px';
    overDiv.style.fontFamily = `Helvetica, sans-serif`;
    overDiv.style.fontSize = '12px';
    overDiv.style.fontWeight = 'normal';
    overDiv.style.color = '#ffffff';
    overDiv.innerHTML =
      `<h2>Score ${currentScore}</h2>` + `<h2>Highest ${highScore}</h2>`;
    overDiv.style.zIndex = '20';
    gameDiv.appendChild(overDiv);
  };

  var spaceActionListener = event => {
    var keyCode = event.keyCode;
    if (keyCode == keys) {
      if (birdObj.playing) {
        birdObj.moveUp();
        birdObj.dy = 0;
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
        var scoreSound = new Audio();
        scoreSound.src = 'sounds/sfx_coins.mp3';
        scoreSound.play();
        pipes[0].removeSelf();
        pipes.splice(0, 1);
        currentScore++;
        if (highScore < currentScore) {
          highScore = currentScore;
          localStorage.setItem('highScore', highScore);
        }
        scoreDiv.innerHTML = `<h2>${currentScore}</h2>`;
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
      var fallSound = new Audio();
      fallSound.src = 'sounds/sfx_die.mp3';
      fallSound.play();
      document.removeEventListener('keydown', spaceActionListener);
      startBtn.removeEventListener('click', clickActionListener);
      clearInterval(intervalId);
      createGameOver();
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
        if (
          birdObj.y < value.yTopPipe ||
          birdObj.y + birdObj.height > value.yBottomPipe
        ) {
          collisionHappens();
        }
      }
    });
  };

  var collisionHappens = () => {
    birdObj.changeImage();
    var fallDown = setInterval(function() {
      birdObj.fallDown();
    }, 10);
    var fallSound = new Audio();
    fallSound.src = 'sounds/sfx_die.mp3';
    fallSound.play();
    document.removeEventListener('keydown', spaceActionListener);
    startBtn.removeEventListener('click', clickActionListener);
    clearInterval(intervalId);
    createGameOver();
    setTimeout(() => {
      this.resetGame();
      clearInterval(fallDown);
    }, 3000);
  };

  this.resetGame = () => {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
    pipes = [];
    currentScore = 0;
    this.init();
  };

  var clickActionListener = event => {
    gameDiv.removeChild(startBtn);
    createScore();
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
