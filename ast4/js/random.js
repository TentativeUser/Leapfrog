function Random() {
  var vehicle = [
    'simple_car_blue',
    'simple_car_green',
    'simple_car_orange',
    'simple_car_purple',
    'simple_car_red',
    'simple_car_yellow'
  ];
  var lanes = ['left', 'center', 'right'];

  var playerCars = [
    'taxi',
    'police',
    'car',
    'black_viper',
    'audi',
    'ambulance'
  ];

  /**
   * Gives a random number
   * @returns {number} random number
   */
  this.getRandInt = function() {
    return Math.floor(Math.random() * 2);
  };
  /**
   * Gives a random number between a range
   * @param {number} min minimum number
   * @param {number} max maximum number
   * @returns {number} random number between min and max
   */
  this.getRandRange = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };
  /**
   * Gives a vehicle type from a vehicle type array
   * @returns {string} a random string from vehicle type array
   */
  this.getVehicle = function() {
    return vehicle[this.getRandRange(0, vehicle.length - 1)];
  };
  /**
   * Gives a lane type from a lane type array
   * @returns {string} a random string from lane type array
   */
  this.getLane = function() {
    return lanes[this.getRandRange(0, lanes.length - 1)];
  };
  /**
   * Gives a player type from a player type array
   * @returns {string} a random string from player type array
   */
  this.getPlayer = function() {
    return playerCars[this.getRandRange(0, playerCars.length - 1)];
  };
}
