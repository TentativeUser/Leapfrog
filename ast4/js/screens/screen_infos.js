function ScreenInfo(parent) {
  var info = null;
  var ammoIcon = null;
  var scoreh2High = null;
  var scoreh2Current = null;

  function createElement() {
    var scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score_div');
    scoreh2High = document.createElement('h2');
    scoreh2Current = document.createElement('h2');
    var infoDiv = document.createElement('div');
    infoDiv.classList.add('info_div');
    var infoh2 = document.createElement('h2');
    infoh2.innerText = 'Info:';
    info = document.createElement('p');
    var ammo = document.createElement('div');
    ammo.innerHTML = '<h2>Ammo:</h2>';
    ammo.style.position = 'relative';
    ammoIcon = document.createElement('div');
    ammoIcon.classList.add('ammo');

    ammo.appendChild(ammoIcon);
    scoreDiv.appendChild(scoreh2High);
    scoreDiv.appendChild(scoreh2Current);
    scoreDiv.appendChild(ammo);
    infoDiv.appendChild(infoh2);
    infoDiv.appendChild(info);
    parent.appendChild(scoreDiv);
    parent.appendChild(infoDiv);
  }
  this.updateScore = function(highScore, currentScore, ammo) {
    scoreh2High.innerText = 'High Score: ' + highScore;
    scoreh2Current.innerText = 'Current Score: ' + currentScore;

    if (ammo === 1) {
      ammoIcon.style.display = 'block';
    } else {
      ammoIcon.style.display = 'none';
    }
  };
  this.updateInfo = function(keys) {
    if (keys === 'arrow') {
      info.innerHTML = `Press <i class="fa fa-arrow-up"></i> to fire.
      Press <i class="fa fa-arrow-left"></i> for left.
      Press <i class="fa fa-arrow-right"></i> for right.`;
    }
    if (keys === 'wasd') {
      info.innerHTML = `Press 'W' to fire.
      Press A for left.
      Press D for right.`;
    }
  };
  this.init = function() {
    createElement();

    return this;
  };
}
