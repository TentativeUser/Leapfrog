/**
 *
 * @param {HTMLElement} parent
 */
function Bullet(parent) {
  this.moveUp = function() {
    var top = this.getY() - 10;
    this.setY(top);
    this.draw();
  };
  this.create = function() {
    this.createObject();
    this.getHTMLElement().classList.add('bullet');
    this.reAlignDimension();
  };
  this.init = function() {
    SimpleObject.call(this, parent);
    return this;
  };
}
Bullet.prototype = Object.create(SimpleObject.prototype);
Bullet.prototype.constructor = Bullet;
