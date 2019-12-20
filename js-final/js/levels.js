/**
 * Class for game level
 * @class Level1
 */
class Level1 {
  /**
   *Creates an instance of Level1.
   * @param {HTMLElement} parent html element container for canvas
   * @memberof Level1
   */
  constructor(parent) {
    let mid = GAME_WIDTH / 2;
    let y = (125 / 360) * GAME_HEIGHT;
    let x1 = mid - (141 / 640) * GAME_WIDTH;
    let x2 = mid + (141 / 640) * GAME_WIDTH;

    this.parent = parent;
    this.name = 'level1';
    this.completedImage = null;
    this.compositeObjects = [];
    this.animationRequest = null;
    this.bBallPos = new Vector(x1, y);
    this.rBallPos = new Vector(x2, y);

    this.createCanvas();
    this.initializeElements();
    this.paintLines();
    this.collision = new Collision(this.context);
  }

  createCanvas = () => {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;

    this.parent.appendChild(this.canvas);
  };

  sendBackBtn = btn => {
    this.back = btn;
  };

  getCanvas = () => {
    return this.canvas;
  };

  initializeElements = () => {
    this.blueBall = new Ball(this.context, this.bBallPos, '#3ebfef');
    this.redBall = new Ball(this.context, this.rBallPos, '#ee86b4');

    this.boundary = (34 / 360) * GAME_HEIGHT;
    this.context.beginPath();
    this.context.fillStyle = '#959494';
    this.context.fillRect(
      0,
      GAME_HEIGHT - this.boundary,
      GAME_WIDTH,
      this.boundary
    );
    this.context.closePath();
  };

  paintLines = () => {
    let isMouseDown = false;
    let ePoint = new Vector();
    let cObj = null;
    this.cObj = cObj;

    this.canvas.addEventListener('mousedown', e => {
      isMouseDown = true;
      ePoint.x = e.pageX - this.canvas.offsetLeft;
      ePoint.y = e.pageY - this.canvas.offsetTop;
      cObj = new CompositeObject(this.canvas, this.context);
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      this.context.moveTo(ePoint.x, ePoint.y);
    });

    this.canvas.addEventListener('mouseup', e => {
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      let lastPoint = new Vector(ePoint);
      ePoint.x = e.pageX - this.canvas.offsetLeft;
      ePoint.y = e.pageY - this.canvas.offsetTop;
      if (isMouseDown && lastPoint.x === ePoint.x && lastPoint.y === ePoint.y) {
        this.context.beginPath();
        this.context.fillStyle = '#959494';
        this.context.arc(ePoint.x, ePoint.y, 3, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();
      }
      isMouseDown = false;
      cObj.pushPosition(new Vector(ePoint));
      cObj.smoothPositions();
      this.compositeObjects.push(cObj);
    });

    this.canvas.addEventListener('mousemove', e => {
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      if (isMouseDown) {
        this.context.lineCap = 'round';
        this.context.strokeStyle = '#959494';
        this.context.lineWidth = 10;
        ePoint.x = e.pageX - this.canvas.offsetLeft;
        ePoint.y = e.pageY - this.canvas.offsetTop;
        this.context.lineTo(ePoint.x, ePoint.y);
        cObj.pushPosition(new Vector(ePoint));
        this.context.stroke();
        this.cObj = cObj;
      }
    });
  };

  redraw = () => {
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    let bCollPoint = null;
    let rCollPoint = null;
    let bCollHeight = 0;
    let rCollHeight = 0;

    this.compositeObjects.forEach(val => {
      bCollPoint = this.collision.isCollision(this.blueBall, val);
      rCollPoint = this.collision.isCollision(this.redBall, val);
    });

    bCollHeight = bCollPoint ? GAME_HEIGHT - bCollPoint.y : bCollHeight;
    rCollHeight = rCollPoint ? GAME_HEIGHT - rCollPoint.y : rCollHeight;

    bCollHeight = this.boundary > bCollHeight ? this.boundary : bCollHeight;
    rCollHeight = this.boundary > rCollHeight ? this.boundary : rCollHeight;

    if (this.cObj) {
      this.cObj.draw();
    }

    this.compositeObjects.forEach(cObj => {
      cObj.gravityEffect();
      cObj.draw();
    });

    if (
      this.blueBall.position.y <
        GAME_HEIGHT - this.blueBall.radius - bCollHeight &&
      bCollHeight < this.blueBall.position.y
    ) {
      this.blueBall.gravityEffect();
    }
    if (
      this.redBall.position.y <
        GAME_HEIGHT - this.redBall.radius - rCollHeight &&
      rCollHeight < this.redBall.position.y
    ) {
      this.redBall.gravityEffect();
    }

    this.context.beginPath();
    this.context.fillStyle = '#959494';
    this.context.fillRect(
      0,
      GAME_HEIGHT - this.boundary,
      GAME_WIDTH,
      this.boundary
    );
    this.context.closePath();
    this.blueBall.drawElement();
    this.redBall.drawElement();

    let game_win = this.collision.isCollision(this.blueBall, this.redBall);
    let game_fail = this.redBall.boundary() || this.blueBall.boundary();

    if (game_win) {
      let cData = this.canvas.toDataURL();
      localStorage.setItem(this.name, cData);
      cancelAnimationFrame(this.animationRequest);
      setTimeout(() => {
        this.back.click();
      }, 1000);
    } else if (game_fail) {
      cancelAnimationFrame(this.animationRequest);
      setTimeout(() => {
        this.back.click();
      }, 1000);
    }
    if (!game_win && !game_fail) {
      this.animationRequest = requestAnimationFrame(this.redraw);
    }
  };

  removeSelf() {
    this.parent.removeChild(this.canvas);
  }

  compareVectors = (vec1, vec2) => {
    let dx = Math.abs(vec1.x - vec2.x);
    let dy = Math.abs(vec1.y - vec2.y);
    if (dx > 15 || dy > 15) {
      return true;
    } else {
      return false;
    }
  };
}

class Level2 {
  constructor(parent) {
    let mid = GAME_WIDTH / 2;
    let y1 = (125 / 360) * GAME_HEIGHT;
    let y2 = (315 / 360) * GAME_HEIGHT;
    let x1 = mid - (141 / 640) * GAME_WIDTH;
    let x2 = mid + (141 / 640) * GAME_WIDTH;

    this.parent = parent;
    this.name = 'level2';
    this.completedImage = null;
    this.compositeObjects = [];
    this.animationRequest = null;
    this.bBallPos = new Vector(x1, y1);
    this.rBallPos = new Vector(x2, y2);

    this.createCanvas();
    this.initializeElements();
    this.paintLines();
    this.collision = new Collision(this.context);
  }
  createCanvas = () => {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;

    this.parent.appendChild(this.canvas);
  };

  getCanvas = () => {
    return this.canvas;
  };

  sendBackBtn = btn => {
    this.back = btn;
  };

  initializeElements = () => {
    this.blueBall = new Ball(this.context, this.bBallPos, '#3ebfef');
    this.redBall = new Ball(this.context, this.rBallPos, '#ee86b4');

    this.boundary = (34 / 360) * GAME_HEIGHT;
    this.context.beginPath();
    this.context.fillStyle = '#959494';
    this.context.fillRect(
      0,
      GAME_HEIGHT - this.boundary,
      GAME_WIDTH,
      this.boundary
    );
    this.context.closePath();
  };

  paintLines = () => {
    let isMouseDown = false;
    let ePoint = new Vector();
    let cObj = null;
    this.cObj = cObj;

    this.canvas.addEventListener('mousedown', e => {
      isMouseDown = true;
      ePoint.x = e.pageX - this.canvas.offsetLeft;
      ePoint.y = e.pageY - this.canvas.offsetTop;
      cObj = new CompositeObject(this.canvas, this.context);
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      this.context.moveTo(ePoint.x, ePoint.y);
    });

    this.canvas.addEventListener('mouseup', e => {
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      let lastPoint = new Vector(ePoint);
      ePoint.x = e.pageX - this.canvas.offsetLeft;
      ePoint.y = e.pageY - this.canvas.offsetTop;
      if (isMouseDown && lastPoint.x === ePoint.x && lastPoint.y === ePoint.y) {
        this.context.beginPath();
        this.context.fillStyle = '#959494';
        this.context.arc(ePoint.x, ePoint.y, 3, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();
      }
      isMouseDown = false;
      cObj.pushPosition(new Vector(ePoint));
      cObj.smoothPositions();
      this.compositeObjects.push(cObj);
    });

    this.canvas.addEventListener('mousemove', e => {
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      if (isMouseDown) {
        this.context.lineCap = 'round';
        this.context.strokeStyle = '#959494';
        this.context.lineWidth = 10;
        ePoint.x = e.pageX - this.canvas.offsetLeft;
        ePoint.y = e.pageY - this.canvas.offsetTop;
        this.context.lineTo(ePoint.x, ePoint.y);
        cObj.pushPosition(new Vector(ePoint));
        this.context.stroke();
        this.cObj = cObj;
      }
    });
  };

  redraw = () => {
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    let bCollPoint = null;
    let rCollPoint = null;
    let bCollHeight = 0;
    let rCollHeight = 0;

    this.compositeObjects.forEach(val => {
      bCollPoint = this.collision.isCollision(this.blueBall, val);
      rCollPoint = this.collision.isCollision(this.redBall, val);
    });

    bCollHeight = bCollPoint ? GAME_HEIGHT - bCollPoint.y : bCollHeight;
    rCollHeight = rCollPoint ? GAME_HEIGHT - rCollPoint.y : rCollHeight;

    bCollHeight = this.boundary > bCollHeight ? this.boundary : bCollHeight;
    rCollHeight = this.boundary > rCollHeight ? this.boundary : rCollHeight;

    if (this.cObj) {
      this.cObj.draw();
    }

    this.compositeObjects.forEach(cObj => {
      cObj.gravityEffect();
      cObj.draw();
    });

    if (
      this.blueBall.position.y <
        GAME_HEIGHT - this.blueBall.radius - bCollHeight &&
      bCollHeight < this.blueBall.position.y
    ) {
      this.blueBall.gravityEffect();
    }
    if (
      this.redBall.position.y <
        GAME_HEIGHT - this.redBall.radius - rCollHeight &&
      rCollHeight < this.redBall.position.y
    ) {
      this.redBall.gravityEffect();
    }

    this.context.beginPath();
    this.context.fillStyle = '#959494';
    this.context.fillRect(
      0,
      GAME_HEIGHT - this.boundary,
      GAME_WIDTH,
      this.boundary
    );

    this.context.closePath();
    this.blueBall.drawElement();
    this.redBall.drawElement();

    let game_win = this.collision.isCollision(this.blueBall, this.redBall);
    let game_fail = this.redBall.boundary() || this.blueBall.boundary();

    if (game_win) {
      let cData = this.canvas.toDataURL();
      localStorage.setItem(this.name, cData);
      cancelAnimationFrame(this.animationRequest);
      setTimeout(() => {
        this.back.click();
      }, 1000);
    } else if (game_fail) {
      cancelAnimationFrame(this.animationRequest);
      setTimeout(() => {
        this.back.click();
      }, 1000);
    }
    if (!game_win && !game_fail) {
      this.animationRequest = requestAnimationFrame(this.redraw);
    }
  };

  removeSelf() {
    this.parent.removeChild(this.canvas);
  }

  compareVectors = (vec1, vec2) => {
    let dx = Math.abs(vec1.x - vec2.x);
    let dy = Math.abs(vec1.y - vec2.y);
    if (dx > 15 || dy > 15) {
      return true;
    } else {
      return false;
    }
  };
}

class Level3 {
  constructor(parent) {
    let mid = GAME_WIDTH / 2;
    let y = (315 / 360) * GAME_HEIGHT;
    let x1 = mid - (141 / 640) * GAME_WIDTH;
    let x2 = mid + (141 / 640) * GAME_WIDTH;

    this.parent = parent;
    this.name = 'level3';
    this.completedImage = null;
    this.compositeObjects = [];
    this.animationRequest = null;
    this.bBallPos = new Vector(x1, y);
    this.rBallPos = new Vector(x2, y);

    this.createCanvas();
    this.initializeElements();
    this.paintLines();
    this.collision = new Collision(this.context);
  }

  createCanvas = () => {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;

    this.parent.appendChild(this.canvas);
  };

  getCanvas = () => {
    return this.canvas;
  };

  sendBackBtn = btn => {
    this.back = btn;
  };

  initializeElements = () => {
    this.blueBall = new Ball(this.context, this.bBallPos, '#3ebfef');
    this.redBall = new Ball(this.context, this.rBallPos, '#ee86b4');

    this.boundary = (34 / 360) * GAME_HEIGHT;
    this.context.beginPath();
    this.context.fillStyle = '#959494';
    this.context.fillRect(
      0,
      GAME_HEIGHT - this.boundary,
      GAME_WIDTH,
      this.boundary
    );
    this.context.closePath();
  };

  paintLines = () => {
    let isMouseDown = false;
    let ePoint = new Vector();
    let cObj = null;
    this.cObj = cObj;

    this.canvas.addEventListener('mousedown', e => {
      isMouseDown = true;
      ePoint.x = e.pageX - this.canvas.offsetLeft;
      ePoint.y = e.pageY - this.canvas.offsetTop;
      cObj = new CompositeObject(this.canvas, this.context);
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      this.context.moveTo(ePoint.x, ePoint.y);
    });

    this.canvas.addEventListener('mouseup', e => {
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      let lastPoint = new Vector(ePoint);
      ePoint.x = e.pageX - this.canvas.offsetLeft;
      ePoint.y = e.pageY - this.canvas.offsetTop;
      if (isMouseDown && lastPoint.x === ePoint.x && lastPoint.y === ePoint.y) {
        this.context.beginPath();
        this.context.fillStyle = '#959494';
        this.context.arc(ePoint.x, ePoint.y, 3, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();
      }
      isMouseDown = false;
      cObj.pushPosition(new Vector(ePoint));
      cObj.smoothPositions();
      this.compositeObjects.push(cObj);
    });

    this.canvas.addEventListener('mousemove', e => {
      if (e.pageY - this.canvas.offsetTop > GAME_HEIGHT - this.boundary) return;
      if (isMouseDown) {
        this.context.lineCap = 'round';
        this.context.strokeStyle = '#959494';
        this.context.lineWidth = 10;
        ePoint.x = e.pageX - this.canvas.offsetLeft;
        ePoint.y = e.pageY - this.canvas.offsetTop;
        this.context.lineTo(ePoint.x, ePoint.y);
        cObj.pushPosition(new Vector(ePoint));
        this.context.stroke();
        this.cObj = cObj;
      }
    });
  };

  redraw = () => {
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    let bCollPoint = null;
    let rCollPoint = null;
    let bCollHeight = 0;
    let rCollHeight = 0;

    this.compositeObjects.forEach(val => {
      bCollPoint = this.collision.isCollision(this.blueBall, val);
      rCollPoint = this.collision.isCollision(this.redBall, val);
    });

    bCollHeight = bCollPoint ? GAME_HEIGHT - bCollPoint.y : bCollHeight;
    rCollHeight = rCollPoint ? GAME_HEIGHT - rCollPoint.y : rCollHeight;

    bCollHeight = this.boundary > bCollHeight ? this.boundary : bCollHeight;
    rCollHeight = this.boundary > rCollHeight ? this.boundary : rCollHeight;

    if (this.cObj) {
      this.cObj.draw();
    }

    this.compositeObjects.forEach(cObj => {
      cObj.gravityEffect();
      cObj.draw();
    });

    if (
      this.blueBall.position.y <
        GAME_HEIGHT - this.blueBall.radius - bCollHeight &&
      bCollHeight < this.blueBall.position.y
    ) {
      this.blueBall.gravityEffect();
    }
    if (
      this.redBall.position.y <
        GAME_HEIGHT - this.redBall.radius - rCollHeight &&
      rCollHeight < this.redBall.position.y
    ) {
      this.redBall.gravityEffect();
    }

    this.context.beginPath();
    this.context.fillStyle = '#959494';
    this.context.fillRect(
      0,
      GAME_HEIGHT - this.boundary,
      GAME_WIDTH,
      this.boundary
    );
    this.context.closePath();
    this.blueBall.drawElement();
    this.redBall.drawElement();

    let game_win = this.collision.isCollision(this.blueBall, this.redBall);
    let game_fail = this.redBall.boundary() || this.blueBall.boundary();

    if (game_win) {
      let cData = this.canvas.toDataURL();
      localStorage.setItem(this.name, cData);
      cancelAnimationFrame(this.animationRequest);
      setTimeout(() => {
        this.back.click();
      }, 1000);
    } else if (game_fail) {
      cancelAnimationFrame(this.animationRequest);
      setTimeout(() => {
        this.back.click();
      }, 1000);
    }
    if (!game_win && !game_fail) {
      this.animationRequest = requestAnimationFrame(this.redraw);
    }
  };

  removeSelf() {
    this.parent.removeChild(this.canvas);
  }

  compareVectors = (vec1, vec2) => {
    let dx = Math.abs(vec1.x - vec2.x);
    let dy = Math.abs(vec1.y - vec2.y);
    if (dx > 15 || dy > 15) {
      return true;
    } else {
      return false;
    }
  };
}
