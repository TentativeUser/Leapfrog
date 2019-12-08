/**
 * Handles the selector string and creates the slider
 * @param {String} selector CSS selector from slider container element
 */
function SliderMain(selector) {
  var container;
  this.init = function() {
    if (selector.startsWith('.', 0)) {
      selector = selector.replace('.', '');
      container = document.getElementsByClassName(selector);
    } else if (selector.startsWith('#', 0)) {
      selector = selector.replace('#', '');
      container = document.getElementById(selector);
    } else {
      container = document.getElementsByClassName(selector);
    }
    var args = Array.from(arguments);
    Array.from(container).forEach(function(value, index) {
      new Slider(value).init(args[index]);
    });
  };
}
