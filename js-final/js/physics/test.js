document.head.style.margin = 0;
document.head.style.padding = 0;
document.body.style.width = '100%';
document.body.style.height = '100%';
document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.width = '100%';
document.body.style.height = '100%';
document.body.style.background = 'red';
document.body.style.overflow = 'hidden';
var canvas = document.getElementById('brain_dots');
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.margin = 0;
canvas.style.padding = 0;
canvas.style.background = '#fff';
var context = canvas.getContext('2d');

class PencilDot {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velocityX = velX;
    this.velocityY = velY;
    this.imageSrc = 'images/Ink_Pencil.png';
    this.image = new Image();
    this.image.src = this.imageSrc;
    this.isMoving = false;
    this.draw();
  }
  draw = () => {
    context.drawImage(this.image, this.x, this.y, 10, 10);
  };
  update = () => {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.draw();
  };
}

let pencilDots = [];
var animate = () => {
  canvas.addEventListener('mousedown', event => {
    let canvasX = event.pageX;
    let canvasY = event.pageY;
    pencilDots.push(new PencilDot(canvasX, canvasY, 0, 2));

    function draw(event) {
      canvasX = event.pageX;
      canvasY = event.pageY;
      pencilDots.push(new PencilDot(canvasX, canvasY, 0, 2));
    }
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', event => {
      canvas.removeEventListener('mousemove', draw);
      pencilDots.forEach(pencilDot => {
        pencilDot.isMoving = true;
      });
    });
  });
  context.clearRect(0, 0, innerWidth, innerHeight);
  pencilDots.forEach(pencilDot => {
    if (pencilDot.isMoving) {
      pencilDot.update();
    }
  });
  requestAnimationFrame(animate);
};

animate();
