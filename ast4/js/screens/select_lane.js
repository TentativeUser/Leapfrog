(function() {
  var one = document.getElementById('one');
  var two = document.getElementById('two');
  var random = document.getElementById('random');
  one.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('perLane', 1);
    window.location.href = './select-instance.html';
  });
  two.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('perLane', 2);
    window.location.href = './select-instance.html';
  });
  random.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('perLane', 3);
    window.location.href = './select-instance.html';
  });
})();
