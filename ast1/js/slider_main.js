function SliderMain(className) {
  var container = document.getElementsByClassName(className);
  this.init = function() {
    Array.prototype.slice.call(container).forEach(function(value, index) {
      value.style.margin = '0 auto';
      value.style.position = 'relative';
      value.style.overflowX = 'hidden';
      new Slider(className, index).init();
    });
  };
}
