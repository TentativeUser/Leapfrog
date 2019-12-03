(function() {
  var ambulance = document.getElementById('ambulance');
  var audi = document.getElementById('audi');
  var black_viper = document.getElementById('black_viper');
  var car = document.getElementById('car');
  var police = document.getElementById('police');
  var taxi = document.getElementById('taxi');

  ambulance.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('playerCar', 'ambulance');
    window.location.href = './index.html';
  });

  audi.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('playerCar', 'audi');
    window.location.href = './index.html';
  });

  black_viper.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('playerCar', 'black_viper');
    window.location.href = './index.html';
  });

  car.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('playerCar', 'car');
    window.location.href = './index.html';
  });

  police.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('playerCar', 'police');
    window.location.href = './index.html';
  });

  taxi.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('playerCar', 'taxi');
    window.location.href = './index.html';
  });
})();
