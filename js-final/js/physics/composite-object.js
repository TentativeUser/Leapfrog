class CompositeObject {
  constructor(canvas, context) {
    this.mass = 0.1;
    this.positions = [];
    this.canvas = canvas;
    this.context = context;
    this.force = new Vector();
    this.position = new Vector();
    this.velocity = new Vector();
  }

  pushPosition = position => {
    this.positions.push(position);
  };

  gravityEffect = () => {
    let boundary = (37 * GAME_HEIGHT) / 360;
    this.velocity.y = this.velocity.y + GRAVITY * (10 / 1000);
    if (this.getLowestPoint(this.positions).y < GAME_HEIGHT - boundary) {
      this.position.y += (this.velocity.y * 10) / 100;
      this.position.y = Math.round(this.position.y);
      this.draw(this.velocity);
    } else {
      this.centerOfMass();
    }
  };

  draw = val => {
    val = val || new Vector();
    this.positions.forEach(pos => {
      pos.x += Math.round((val.x * 16) / 100);
      pos.y += Math.round((val.y * 16) / 100);
    });
    if (this.positions.length === 1) {
      let point = this.positions[0];
      this.context.beginPath();
      this.context.fillStyle = '#959494';
      this.context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
      this.context.fill();
      this.context.closePath();
    } else {
      this.context.beginPath();
      this.positions.forEach((position, index) => {
        if (index === 0) {
          this.context.moveTo(position.x, position.y);
        } else {
          this.context.lineWidth = 10;
          this.context.lineTo(position.x, position.y);
          this.context.stroke();
        }
      });
    }
    this.context.closePath();
  };

  smoothPositions = () => {
    let lastPos = new Vector();
    this.sPositions = [];
    for (let i = 0; i < this.positions.length; i++) {
      if (this.compareVectors(lastPos, this.positions[i])) {
        this.sPositions.push(new Vector(this.positions[i]));
        lastPos = this.positions[i];
      }
    }
    this.positions = this.sPositions;
  };

  compareVectors = (vec1, vec2) => {
    let dx = Math.abs(vec1.x - vec2.x);
    let dy = Math.abs(vec1.y - vec2.y);
    if (dx > 5 || dy > 5) {
      return true;
    } else {
      return false;
    }
  };

  getLowestPoint = positions => {
    let temp = new Vector();
    positions.forEach((position, index) => {
      if (temp.y < position.y) {
        temp = position;
      }
    });
    return temp;
  };

  centerOfMass = () => {
    let centerX = 0;
    let centerY = 0;

    this.positions.forEach(vec => {
      centerX += vec.x;
      centerY += vec.y;
    });
    centerX /= this.positions.length;
    centerY /= this.positions.length;
    centerX = centerX | 0;
    centerY = centerY | 0;
    this.centroid = new Vector(centerX, centerY);

    let leftPoints = [];
    let rightPoints = [];
    this.positions.forEach(vec => {
      if (vec.x < centerX) {
        leftPoints.push(vec);
      }
      if (vec.x > centerX) {
        rightPoints.push(vec);
      }
    });

    let lLowestPoint = this.getLowestPoint(leftPoints);
    let rLowestPoint = this.getLowestPoint(rightPoints);

    let rX = rLowestPoint.x - lLowestPoint.x;
    let rY = lLowestPoint.y - rLowestPoint.y;
    let angle = -Math.atan(rY / rX) / 20;
    if (lLowestPoint.y > rLowestPoint.y + 1) {
      let cx = lLowestPoint.x;
      let cy = lLowestPoint.y;
      this.positions.forEach((vec, ind) => {
        let x = vec.x;
        let y = vec.y;
        this.positions[ind] = this.rotate(cx, cy, x, y, angle);
      });
    }
    if (rLowestPoint.y > lLowestPoint.y + 1) {
      let cx = rLowestPoint.x;
      let cy = rLowestPoint.y;
      this.positions.forEach((vec, ind) => {
        let x = vec.x;
        let y = vec.y;
        this.positions[ind] = this.rotate(cx, cy, x, y, angle);
      });
    }
  };

  rotate = (cx, cy, x, y, angle) => {
    var radians = angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;

    return new Vector(nx, ny);
  };
}
