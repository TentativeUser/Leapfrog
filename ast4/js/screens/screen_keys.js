/**
 * Creates the choose keys screen for the game.
 * @param {HTMLElement} parent HTML element that wraps the choice screen ie. road
 */
function ScreenKeys(parent) {
  var screenDiv = null;
  var anchorWASD = null;
  var anchorArrow = null;

  function createElement() {
    screenDiv = document.createElement('div');
    screenDiv.classList.add('screen_background');
    var choices = document.createElement('p');
    choices.innerText = 'Choose your keys';
    anchorArrow = document.createElement('a');
    anchorWASD = document.createElement('a');
    anchorArrow.href = '#';
    anchorWASD.href = '#';
    anchorArrow.innerHTML = '<img src="images/arrow-keys.png">';
    anchorWASD.innerHTML = '<img src="images/wasd-keys.png">';
    screenDiv.appendChild(choices);
    screenDiv.appendChild(anchorArrow);
    screenDiv.appendChild(anchorWASD);
    parent.appendChild(screenDiv);
  }

  this.getLinkArrow = function() {
    return anchorArrow;
  };

  this.getLinkWASD = function() {
    return anchorWASD;
  };

  this.getHTMLElement = function() {
    return screenDiv;
  };

  this.init = function() {
    createElement();

    return this;
  };
}
