function Pipes(parent) {
  this.y = 0;
  this.width = 138;
  this.element = null;
  this.x = parent.offsetWidth;
  var gap = 150;
  var pipeTop = document.createElement('div');
  var pipeBottom = document.createElement('div');
  this.yTopPipe = getRandInt(50, 200);
  this.yBottomPipe = this.yTopPipe + gap;

  this.createPipes = () => {
    pipeTop.style.position = 'absolute';
    pipeTop.style.width = this.width + 'px';
    pipeTop.style.height = this.yTopPipe + 'px';
    pipeTop.style.background =
      'url(images/pipeNorth.png) no-repeat bottom left';
    pipeTop.style.top = '0px';
    pipeTop.style.left = GAMEWIDTH + 'px';

    pipeBottom.style.position = 'absolute';
    pipeBottom.style.width = this.width + 'px';
    pipeBottom.style.height = GAMEHEIGHT - this.yBottomPipe + 'px';
    pipeBottom.style.background =
      'url(images/pipeSouth.png) no-repeat top left';
    pipeBottom.style.top = this.yBottomPipe + 'px';
    pipeBottom.style.left = GAMEWIDTH + 'px';

    parent.appendChild(pipeTop);
    parent.appendChild(pipeBottom);
  };
  this.update = () => {
    this.x -= 5;
    pipeTop.style.left = this.x + 'px';
    pipeBottom.style.left = this.x + 'px';
  };
  this.removeSelf = () => {
    parent.removeChild(pipeTop);
    parent.removeChild(pipeBottom);
  };
  this.init = () => {
    return this;
  };
}
