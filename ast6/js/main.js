class Helix {
  constructor(selector, lines, balls, radius, frequency) {
    let container = document.getElementsByClassName(selector);
    this.lines = lines;
    let colors = this.makeGradience();
    Array.from(container).forEach((value, index) => {
      value.style.display = 'inline-block';
      value.style.background = '#043a4a';
      var parent = value.parentElement;
      parent.style.textAlign = 'center';
      new HelicalStructure(value, lines, balls, radius, frequency, colors);
    });
  }
  makeGradience = () => {
    let color1 = { r: 254, g: 174, b: 115 };
    let color2 = { r: 225, g: 125, b: 164 };
    let colorDiff = { r: 0, g: 0, b: 0 };
    let colors = [];
    for (let i in color1) {
      colorDiff[i] = color1[i] - color2[i];
    }
    for (let i = 1; i <= this.lines; i++) {
      let color =
        'rgb(' +
        (color1.r - (i * colorDiff.r) / this.lines) +
        ',' +
        (color1.g - (i * colorDiff.g) / this.lines) +
        ',' +
        (color1.b - (i * colorDiff.b) / this.lines) +
        ')';
      colors.push(color);
    }
    return colors;
  };
}

new Helix('container', 20, 15, 10, 0.1);
