function ScreenOver(parent) {
  var anchorRestart = null;
  var screenDiv = null;
  function createElement() {
    screenDiv = document.createElement('div');
    screenDiv.classList.add('screen_background');
    anchorRestart = document.createElement('a');
    anchorRestart.href = '#';
    anchorRestart.innerText = 'Restart game';
    screenDiv.appendChild(anchorRestart);
    parent.appendChild(screenDiv);
  }
  this.getScreen = function() {
    return screenDiv;
  };
  this.getRestartLink = function() {
    return anchorRestart;
  };
  this.init = function() {
    createElement();
    return this;
  };
}
