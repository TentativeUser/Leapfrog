/**
 * Opponent Class that extends Vehicle
 * @param {HTMLElement} parent
 */
function Opponent(parent) {
  var helperObj = new Random();
  this.create = function() {
    this.createObject();
    var playerCar = helperObj.getVehicle();
    var ele = this.getHTMLElement();
    ele.classList.add(playerCar);
    ele.style.transform = 'rotate(180deg)';
    this.reAlignDimension();
    this.setY(-this.getHeight());
    lane = helperObj.getLane();
    this.setLane(lane);
    this.draw();
  };
  this.init = function() {
    SimpleObject.call(this, parent);
    return this;
  };
}
Opponent.prototype = Object.create(SimpleObject.prototype);
Opponent.prototype.constructor = Opponent;
