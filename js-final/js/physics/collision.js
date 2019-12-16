class Collision {
  constructor() {
    this.ballObjectCollisionPoint = null;
  }

  isCollision = (obj1, obj2) => {
    if (obj1 instanceof Ball && obj2 instanceof CompositeObject) {
      return this.ballObjectCollision(obj1, obj2);
    } else if (obj1 instanceof CompositeObject && obj2 instanceof Ball) {
      return this.ballObjectCollision(obj2, obj1);
    } else if (obj1 instanceof Ball && obj2 instanceof Ball) {
      return this.ballCollision(obj1, obj2);
    } else if (
      obj1 instanceof CompositeObject &&
      obj2 instanceof CompositeObject
    ) {
      return this.objectCollision(obj1, obj2);
    }
  };

  /**
   * Detects ball to ball collision
   * @param {Ball} ball1 any of the given two balls
   * @param {Ball} ball2 any of the given two balls
   * @returns {Boolean} true if collision occurs else false
   * @memberof Collision
   */
  ballCollision = (ball1, ball2) => {
    let dx = ball1.position.x - ball2.position.x;
    let dy = ball1.position.y - ball2.position.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < ball1.radius + ball2.radius) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Detects composite object to composite object collision
   * @param {CompositeObject} obj1 composite object drawn on screen
   * @param {CompositeObject} obj2 composite object drawn on screen
   * @returns {Boolean} true if collision occurs else false
   * @memberof Collision
   */
  objectCollision = (obj1, obj2) => {};

  /**
   * Detects ball to composite object collision
   * @param {Ball} ball any ball on the screen
   * @param {CompositeObject} obj composite object drawn on screen
   * @returns {Boolean} true if collision occurs else false
   * @memberof Collision
   */
  ballObjectCollision = (ball, obj) => {
    let positions = [];
    let lastVec = null;
    let currentVec = null;
    let dx, dy, m, x, y, c;
    let tempPos = [...obj.sPositions];
    let collisionPoint = null;
    tempPos.sort((vec1, vec2) => (vec1.x > vec2.x ? 1 : -1));

    tempPos.forEach((vecs, index) => {
      if (index == 0) {
        lastVec = new Vector(vecs);
      } else {
        currentVec = new Vector(vecs);
        dx = currentVec.x - lastVec.x;
        dy = currentVec.y - lastVec.y;
        m = dy / dx;
        for (let i = 0; i <= dx; ++i) {
          c = lastVec.y - lastVec.x * m;
          x = lastVec.x + i;
          y = (m * x + c) | 0;
          positions.push({ x, y, m });
        }
        lastVec = new Vector(vecs);
      }
    });
    x = lastVec.x;
    y = lastVec.y;
    if (!m) m = 0;
    positions.push({ x, y, m });

    positions.forEach(vecs => {
      let diffX = vecs.x - ball.position.x;
      let diffY = vecs.y - ball.position.y;
      let dist = Math.sqrt(diffX * diffX + diffY * diffY);
      if (dist < ball.radius + 6) {
        let x1 = vecs.x;
        let y1 = vecs.y - 5;
        if (vecs.m > 0) {
          if (diffY < 0) {
            ball.velocity.x -= 0.1 * vecs.m;
          }
          if (diffY > 0) {
            ball.velocity.x += 0.1 * vecs.m;
          }
        } else if (vecs.m < 0) {
          if (diffY < 0) {
            ball.velocity.x += 0.1 * -vecs.m;
          }
          if (diffY > 0) {
            ball.velocity.x -= 0.1 * -vecs.m;
          }
        }
        collisionPoint = new Vector(x1, y1);
      }
    });
    if (collisionPoint) {
      if (ball.velocity.x > 0) {
        ball.velocity.x -= 0.03;
      }
      if (ball.velocity.x < 0) {
        ball.velocity.x += 0.03;
      }
      if (ball.velocity.x > -0.01 && ball.velocity.x < 0.01) {
        ball.velocity.x = 0;
      }
    }
    return collisionPoint;
  };
}
