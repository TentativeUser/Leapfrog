class Ball {
  /**
   * Creates an instance of Ball.
   * @param {CanvasRenderingContext2D} context rendering context to draw on
   * @param {Vector} position position of object in x and y direction
   * @param {string} color color of object
   * @memberof Ball
   */
  constructor(context, position, color) {
    this.mass = 0.1;
    this.force = new Vector();
    this.position = new Vector();
    this.velocity = new Vector();
    this.radius = (13 / 640) * GAME_WIDTH;
    this.color = color;
    this.context = context;
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
    this.velocity.y = this.velocity.y + GRAVITY * (16 / 1000);
    /* y = y + vt, t = fps *scale, scale : 100px = 1m */
    this.position.y += (this.velocity.y * 16) / 100;
    this.position.y = this.position.y | 0;
  };
  moveX = () => {
    this.position.x += (this.velocity.x * 16) / 100;
    this.position.x = this.position.x | 0;
  };
}
