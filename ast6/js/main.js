class Helix {
  constructor(selector, lines, balls, radius, frequency) {
    let container = document.getElementsByClassName(selector);
    let colors = [
      '#feae73',
      '#feaa77',
      '#fea57c',
      '#fea081',
      '#fa968b',
      '#f59190',
      '#f08c95',
      '#eb879a',
      '#e6829f',
      '#e17da4'
    ];
    Array.from(container).forEach((value, index) => {
      value.style.display = 'inline-block';
      value.style.background = '#043a4a';
      var parent = value.parentElement;
      parent.style.textAlign = 'center';
      new HelicalStructure(value, 10, 15, 10, 0.1, colors);
    });
  }
}

class HelicalStructure {
  constructor(element, lines, balls, radius, frequency, colors) {
    this.x = 0;
    this.y = 0;
    this.midY = 0;
    this.midX = 0;
    this.frame = 0;
    this.lines = lines;
    this.balls = balls;
    this.radius = radius;
    this.spirals = 2;
    this.waveSpeed = 0;
    this.frequency = frequency;
    this.wavePosition = 0;
    this.radiusLimit = 10;
    this.waveAmplitude = 55;
    this.phaseDifference = 0;
    this.offsetX = this.radius * 2 + 2;
    this.colors = colors;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 540;
    this.canvas.height = 540;

    this.draw();
    this.calcMiddle();
    setInterval(this.draw, 60);
    element.appendChild(this.canvas);
  }
  calcMiddle = () => {
    this.midX = (this.balls * this.radius) / 2 + this.offsetX;
    this.midY =
      this.offsetX +
      (this.canvas.height - (this.lines * this.radius * 2 + (this.lines - 1))) /
        2;
  };

  draw = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.phaseDifference = 0;
    this.wavePosition++;
    /**
     * v = x * f
     * where v is wave velocity,
     * x is position of matter at point 't' time and
     * f is frequency
     */
    this.waveSpeed = this.wavePosition * this.frequency;
    for (let spiral = 0; spiral < this.spirals; spiral++) {
      /**
       * w = v * k, similar but w depends on wave number(k).
       * k is in meters
       * w = v + pi flips the wave on x axis....
       * sin(X + 180) = -sin(X)
       */
      this.omega = this.waveSpeed + spiral * Math.PI;

      // set position to middle...
      this.x = this.midX;
      for (let ball = 0; ball < this.balls; ball++) {
        this.x += this.offsetX;
        /**
         * from left to right ball position and phase difference
         * b0-b1-b2-.................
         * |-----|-----||-----|-----|
         * 0    PI    2PI
         * phase difference = 2 PI * ball / distance betn balls
         */
        this.phaseDifference = (2 * Math.PI * ball) / this.offsetX;
        for (let column = 0; column < this.lines; column++) {
          /**
           * y = A * sin(wt + kx)
           * positionY = middlePositionY + gap +A sin(wt + kx)
           * where
           * gap = row * number of balls
           * A is amplitude of wave
           * wt = w
           * kx = phase difference i.e
           */
          this.y =
            this.midY +
            column * this.balls +
            this.waveAmplitude * Math.sin(this.omega + this.phaseDifference);
          /**
           * r = Ro * sin(wt+kx) or Ro * cos(wt+kx)
           * sin and cos gives us a number in range -1 to 1
           * we cant print negative numbers, so we add it by 1
           * so at maximum value r = 2 * Ro, where r > Ro
           * we divide it by 2
           */
          this.changeRadius =
            (1 +
              Math.cos(
                this.omega + this.phaseDifference - column / this.lines
              )) /
            2;
          this.radius = this.changeRadius * this.radiusLimit;

          new Circle(
            this.context,
            this.x,
            this.y,
            this.radius,
            this.colors[column]
          );
        }
      }
    }
  };
}

class Circle {
  constructor(context, x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
}

new Helix('container', 10, 15, 10, 0.1, colors);
