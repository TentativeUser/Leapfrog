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
  var lane = 'center';
  var carLeft = 0;
  var carRight = 0;
  var carCenter = 0;
  var CENTER_LANE_CENTER = parent.offsetWidth / 2;
  var LEFT_LANE_CENTER = CENTER_LANE_CENTER - 115;
  var RIGHT_LANE_CENTER = CENTER_LANE_CENTER + 115;

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
  this.getLane = function() {
    return lane;
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
  this.collides = function(object) {
    return (
      this.getX() < object.getX() + object.getWidth() &&
      this.getX() + this.getWidth() > object.getX() &&
      this.getY() < object.getY() + object.getHeight() &&
      this.getY() + this.getHeight() > object.getY()
    );
  };
  this.createObject = function() {
    element = document.createElement('div');
    element.style.top = y + 'px';
    element.style.left = x + 'px';
    element.classList.add('cars');
    parentElement.appendChild(element);
  };
  this.removeSelf = function() {
    parentElement.removeChild(element);
  };
  this.reAlignDimension = function() {
    width = element.offsetWidth;
    height = element.offsetHeight;
    carLeft = LEFT_LANE_CENTER - width / 2;
    carRight = RIGHT_LANE_CENTER - width / 2;
    carCenter = CENTER_LANE_CENTER - width / 2;
  };
  this.setLane = function(type) {
    switch (type) {
      case 'left':
        x = carLeft;
        break;
      case 'right':
        x = carRight;
        break;
      case 'center':
        x = carCenter;
      default:
        break;
    }
  };
  this.moveLeft = function() {
    if (lane === 'right') {
      lane = 'center';
    } else {
      lane = 'left';
    }
    this.setLane(lane);
  };
  this.moveRight = function() {
    if (lane === 'left') {
      lane = 'center';
    } else {
      lane = 'right';
    }
    this.setLane(lane);
  };
  this.moveDown = function(val) {
    var up = 9;
    if (val) up = val;
    var top = this.getY() + 9;
    this.setY(top);
    this.draw();
  };
}
