/**
 * Vector class for defining vectors.
 * @class Vector
 */
class Vector {
  constructor(x, y) {
    if (x instanceof Vector) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }
  }
}
