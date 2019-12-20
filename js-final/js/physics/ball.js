class Ball {
  /**
   * Creates an instance of Ball.
   * @param {CanvasRenderingContext2D} context rendering context to draw on
   * @param {Vector} position position of object in x and y direction
   * @param {string} color color of object
   * @memberof Ball
   */
  constructor(context, position, color) {
    this.color = color;
    this.friction = 0.03;
    this.fps = 16 / 1000;
    this.context = context;
    this.force = new Vector();
    this.position = new Vector();
    this.velocity = new Vector();
    this.radius = (13 / 640) * GAME_WIDTH;
    this.position = position || { x: 0, y: 0 };

    this.drawElement();
  }
  drawElement = () => {
    this.moveX();
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.context.fill();
    this.context.closePath();
  };
  gravityEffect = () => {
    /* v = u + at, a = g and t = fps*/
    this.velocity.y = this.velocity.y + GRAVITY * this.fps;
    /* y = y + vt, t = fps *scale, scale : 100px = 1m */
    this.position.y += this.velocity.y * this.fps * 10;
    this.position.y = this.position.y | 0;
  };
  moveX = () => {
    this.position.x += (this.velocity.x * 16) / 100;
    this.position.x = this.position.x | 0;
  };

  boundary = () => {
    if (this.position.x > GAME_WIDTH + this.radius) {
      return true;
    } else if (this.position.x < 0 - this.radius) {
      return true;
    }
    return false;
  };
}
