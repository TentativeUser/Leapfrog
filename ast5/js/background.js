const GAMEHEIGHT = 382;
const GAMEWIDTH = 320;
function getRandInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Background(parent) {
  this.y = GAMEHEIGHT;
  this.posX = 0;
  this.element = null;
  this.parent = parent;
  this.createObject = () => {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = '100%';
    this.element.style.height = '130px';
    this.element.style.top = this.y + 'px';
    this.element.style.background = 'url(images/ground.png) repeat-x';
    parent.appendChild(this.element);
    return this.element;
  };
  this.update = () => {
    this.posX -= 2;
    this.element.style.backgroundPositionX = this.posX + 'px';
  };
}
