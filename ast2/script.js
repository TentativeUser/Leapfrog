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
      new Slider(selector, index).init(args[index]);
    });
  };
}

function Slider(className, ind) {
  /* Slider Structure Properties */
  var slide;
  var images;
  var imgSize;
  var container;
  /* Button and Indicator Properties */
  var indicators = [];
  var btnPrev;
  var btnNext;
  var divIndicators;
  /* Image Sliding Event Properties */
  var counter = 0;
  var flag = false;
  var sliding = false;
  /* Sliding Animation Properties
   * Note: holdTimes should be greater than timeout for unrushed animation.
   */
  var animationInterval = 20;
  var timeOut;
  var holdTimes;
  var intervalID;

  /**
   * Initializes properties and sequences the actions to be performed for slider
   */
  this.init = function(option) {
    container = document.getElementsByClassName(className)[ind || 0];
    slide = container.getElementsByClassName('image-wrapper')[0];
    images = slide.getElementsByTagName('img');
    setup(option);
    resizeWidth();
    positionImages();
    createButtons();
    createIndicators();
    eventListeners();
    autoSlide();
    window.addEventListener('resize', function() {
      resizeWidth();
      positionIndicators(divIndicators);
    });
  };

  /**
   * Sets up options for slider
   */
  function setup(option) {
    holdTimes = option.holdTimes || 3000;
    timeOut = option.animationTimes || 1000;
  }

  /**
   * Resizes sider images according to container
   */
  function resizeWidth() {
    var containerWidth = container.offsetWidth;
    // var imgWidth = images[0].offsetWidth;
    var imgHeight;

    imgSize = containerWidth;

    Array.from(images).forEach(function(value, index) {
      value.style.width = containerWidth + 'px';
    });
    imgHeight = images[0].offsetHeight;
    container.style.height = imgHeight + 'px';
    positionImages();
  }

  /**
   * Applies position for images in div.image-wrapper
   */
  function positionImages() {
    Array.from(images).forEach(function(ele, ind) {
      ele.style.left = imgSize * ind + 'px';
    });
  }

  /**
   * Creates buttons for the slider
   */
  function createButtons() {
    var divButtons = document.createElement('div');
    divButtons.classList.add('controls');
    btnPrev = document.createElement('button');
    btnNext = document.createElement('button');
    btnPrev.classList.add('btn', 'btnPrev');
    btnNext.classList.add('btn', 'btnNext');
    btnPrev.innerHTML = '<i class="fa fa-angle-left"></i>';
    btnNext.innerHTML = '<i class="fa fa-angle-right"></i>';
    divButtons.appendChild(btnPrev);
    divButtons.appendChild(btnNext);
    container.appendChild(divButtons);
  }

  /**
   * Creates buttons for the slider
   * @param {HTMLElement} indicatorContainer Container element for indicators
   */
  function positionIndicators(indicatorContainer) {
    var indicatorWidth = 0;
    var lists = indicatorContainer.getElementsByTagName('li');
    var eleHeight = 0;
    Array.from(lists).forEach(function(ele) {
      indicatorWidth += ele.offsetWidth;
      eleHeight = ele.offsetHeight;
    });
    var top = container.clientHeight;
    indicatorContainer.style.top = top - eleHeight + 'px';
    indicatorContainer.style.width = indicatorWidth + 'px';
  }

  /**
   * Changes the active indicator anchor tag
   */
  function changeIndication() {
    indicators.forEach(function(ele, ind) {
      ele.classList.remove('active');
    });
    indicators.forEach(function(ele, ind) {
      if (ind === counter) {
        ele.classList.add('active');
      }
    });
  }

  /**
   * Creates the indicators for slider
   */
  function createIndicators() {
    divIndicators = document.createElement('div');
    divIndicators.classList.add('indicators');
    var ul = document.createElement('ul');
    Array.from(images).forEach(function(ele, ind) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#';
      a.innerText = ind;
      if (ind === counter) {
        a.classList.add('active');
      }
      li.appendChild(a);
      indicators.push(a);
      ul.appendChild(li);
      divIndicators.appendChild(ul);
      container.appendChild(divIndicators);
    });
    positionIndicators(divIndicators);
  }

  /**
   * Disables arrows/buttons during transition of slides
   * @param {Boolean} value If button to be disabled value is true else false
   */
  function buttonStatus(value) {
    btnNext.disabled = value;
    btnPrev.disabled = value;
  }

  /**
   * Handles shifting event and sliding animation effect for right direction
   */
  function shiftRight() {
    if (event) event.preventDefault();
    if (btnPrev.disabled) return;
    var slided = -imgSize * counter;
    var animateID;
    var toBeSlided;

    clearInterval(intervalID);
    sliding = true;
    buttonStatus(sliding);

    if (counter >= images.length - 1) {
      toBeSlided = -Math.round((images.length - 1) * imgSize);
      counter = 0;
      flag = !flag;
    } else {
      toBeSlided = imgSize;
      counter++;
    }
    animateID = setInterval(function() {
      slided += (-toBeSlided / timeOut) * animationInterval;
      slide.style.left = slided + 'px';
    }, animationInterval);

    changeIndication();
    setTimeout(function() {
      clearInterval(animateID);
      sliding = false;
      buttonStatus(sliding);
    }, timeOut);
    intervalID = setInterval(function() {
      flag ? shiftLeft() : shiftRight();
      if (counter === images.length - 1 || counter === 0) {
        flag = !flag;
      }
    }, holdTimes);
  }

  /**
   * Handles shifting event and sliding animation effect for left direction
   */
  function shiftLeft() {
    if (event) event.preventDefault();
    if (btnNext.disabled) return;
    var slided = -imgSize * counter;
    var animateID;
    var toBeSlided;

    clearInterval(intervalID);
    sliding = true;
    buttonStatus(sliding);

    if (counter <= 0) {
      toBeSlided = Math.round((images.length - 1) * imgSize);
      counter = images.length - 1;
      flag = !flag;
    } else {
      toBeSlided = -imgSize;
      counter--;
    }
    animateID = setInterval(function() {
      slided += (-toBeSlided / timeOut) * animationInterval;
      slide.style.left = slided + 'px';
    }, animationInterval);

    changeIndication();
    setTimeout(function() {
      clearInterval(animateID);
      sliding = false;
      buttonStatus(sliding);
    }, timeOut);
    intervalID = setInterval(function() {
      flag ? shiftLeft() : shiftRight();
      if (counter === images.length - 1 || counter === 0) {
        flag = !flag;
      }
    }, holdTimes);
  }

  /**
   * Handles animation caused by indicator's events
   */
  function indicatorAnimate(ctn, ind) {
    var slided = -imgSize * ctn;
    var toBeSlided = -imgSize * ind;
    var indicatorID;

    sliding = true;
    buttonStatus(sliding);
    clearInterval(intervalID);

    toBeSlided = -imgSize * (ctn - ind);
    indicatorID = setInterval(function() {
      slided -= (toBeSlided / timeOut) * animationInterval;
      slide.style.left = slided + 'px';
    }, animationInterval);
    counter = ind;

    changeIndication();
    setTimeout(function() {
      clearInterval(indicatorID);
      sliding = false;
      buttonStatus(sliding);
    }, timeOut);
    intervalID = setInterval(function() {
      flag ? shiftLeft() : shiftRight();
      if (counter === images.length - 1 || counter === 0) {
        flag = !flag;
      }
    }, holdTimes);
  }

  /**
   * Adds different event listeners to HTML elements
   */
  function eventListeners() {
    btnNext.addEventListener('click', shiftRight);
    btnPrev.addEventListener('click', shiftLeft);
    indicators.forEach(function(ele, ind) {
      ele.addEventListener('click', function(event) {
        event.preventDefault();
        if (counter !== ind && !btnNext.disabled) {
          indicatorAnimate(counter, ind);
        }
      });
    });
  }

  /**
   * Responsible for auto sliding effect in slider
   */
  function autoSlide() {
    intervalID = setInterval(function() {
      flag ? shiftLeft() : shiftRight();
      if (counter === images.length - 1 || counter === 0) {
        flag = !flag;
      }
    }, holdTimes);
  }
}
