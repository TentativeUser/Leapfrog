function Game(selector) {
  var game = document.getElementsByClassName(selector);
  this.init = function() {
    Array.from(game).forEach(function(value) {
      new CarLane(value).init();
    });
  };
}

new Game('wrapper').init();
