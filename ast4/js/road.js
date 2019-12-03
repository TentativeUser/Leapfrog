/**
 * Creates the choose keys screen for the game.
 * @param {HTMLElement} parent HTML element that wraps the road ie. wrapper
 */
function Road(parent) {
  var road = null;
  var moved = 0;
  this.getHTMLElement = function() {
    return road;
  };
  this.createElement = function() {
    road = document.createElement('div');
    road.classList.add('road');
    parent.appendChild(road);
  };
  this.update = function(val) {
    moved += 10;
    if (val) moved = val;
    road.style.backgroundPositionY = moved + 'px';
  };
}
