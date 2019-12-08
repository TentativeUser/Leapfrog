function Helper() {
  var types = ['ant', 'ckrh', 'fbant', 'fly'];
  var colors = ['red', 'blue', 'green', 'yellow', 'aqua'];

  this.getColor = function() {
    var index = this.getRandomInt(0, colors.length);
    return colors[index];
  };

  this.getType = function() {
    return types[this.getRandomInt(0, types.length - 1)];
  };

  this.getRandomInt = function(max, min) {
    return Math.round(Math.random() * (max - min) + min);
  };

  this.getRandomSignedUnity = function() {
    return Math.random() < 0.5 ? -1 : 1;
  };
}
