function Slider(className, ind) {
  /* Slider Structure Properties */
  var slide;
  var images;
  var imgSize;
  var container;
  /* Button and Indicator Properties */
  var indicators = [];
  var indicatorLI = [];
  var btnPrev;
  var btnNext;
  /* Image Sliding Event Properties */
  var counter = 0;
  var flag = false;
  var sliding = false;
  /* Sliding Animation Properties
   * Note: holdTimes should be greater than timeout for unrushed animation.
   */
  var timeout = 1000;
  var holdTimes = 3000;
  var animationInterval = 20;
  var intervalID;

  /**
   * Initializes properties and sequences the actions to be performed for slider
   */
  this.init = function() {
    container = document.getElementsByClassName(className)[ind || 0];
    slide = container.getElementsByClassName('image-wrapper')[0];
    slide.style.position = 'absolute';
    slide.style.width = '100%';
    slide.style.height = '100%';
    images = slide.getElementsByTagName('img');
    positionImages();
    createButtons();
    createIndicators();
    eventListeners();
    autoSlide();
  };

  /**
   * Applies position for images in div.image-wrapper
   */
  function positionImages() {
    Array.prototype.slice.call(images).forEach(function(image, ind) {
      image.style.position = 'absolute';
    });
    imgSize = container.clientWidth;
    Array.prototype.slice.call(images).forEach(function(image, ind) {
      image.style.left = imgSize * ind + 'px';
    });
  }

  /**
   * Creates buttons for the slider
   */
  function createButtons() {
    var divButtons = document.createElement('div');
    divButtons.style.position = 'absolute';
    divButtons.style.width = '100%';
    divButtons.style.height = '100%';

    btnPrev = document.createElement('button');
    btnNext = document.createElement('button');
    btnPrev.classList.add('btn', 'btnPrev');
    btnNext.classList.add('btn', 'btnNext');
    divButtons.appendChild(btnPrev);
    divButtons.appendChild(btnNext);

    var btns = divButtons.getElementsByClassName('btn');
    Array.prototype.slice.call(btns).forEach(function(btn) {
      btn.style.position = 'absolute';
      btn.style.top = '45%';
      btn.style.color = 'rgba(255, 255, 255, 0.8)';
      btn.style.margin = '0 10px';
      btn.style.background = 'none';
      btn.style.border = 'none';
      btn.style.fontSize = '50px';
      btn.style.lineHeight = 1;
      btn.style.cursor = 'pointer';
      btn.style.textShadow = '3px 3px #000000';
      if (btn === btnPrev) {
        btn.style.left = '0';
        btn.innerHTML = '<i class="fa fa-angle-left"></i>';
      }
      if (btn === btnNext) {
        btn.style.right = '0';
        btn.innerHTML = '<i class="fa fa-angle-right"></i>';
      }
      if (btn === document.activeElement) {
        btn.style.outline = 'none';
      }
      btn.addEventListener('mouseover', function(event) {
        btn.style.color = 'rgba(255, 255, 255, 1)';
      });
      btn.addEventListener('mouseout', function(event) {
        btn.style.color = 'rgba(255, 255, 255, 0.8)';
      });
    });

    container.appendChild(divButtons);
  }

  /**
   * Creates buttons for the slider
   * @param {HTMLElement} indicatorContainer Container element for indicators
   */
  function positionIndicators(indicatorContainer) {
    var indicatorWidth = 0;
    var lists = indicatorLI;
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
    var divIndicators = document.createElement('div');
    divIndicators.classList.add('indicators');
    divIndicators.style.position = 'relative';
    divIndicators.style.margin = '0 auto';
    divIndicators.style.height = '20px';
    var ul = document.createElement('ul');
    ul.classList.add('clearfix');
    ul.style.display = 'inline-block';
    ul.style.listStyle = 'none';
    Array.from(images).forEach(function(ele, ind) {
      var li = document.createElement('li');
      li.style.float = 'left';
      if (ind !== 0) li.style.paddingLeft = '5px';
      var a = document.createElement('a');
      a.style.display = 'inline-block';
      a.style.border = '2px solid #ffffff';
      a.style.width = '10px';
      a.style.height = '10px';
      a.style.textIndent = '-10000px';
      a.href = '#';
      a.innerText = ind;
      if (ind === counter) {
        a.classList.add('active');
      }
      li.appendChild(a);
      indicators.push(a);
      indicatorLI.push(li);
      ul.appendChild(li);
      divIndicators.appendChild(ul);
      container.appendChild(divIndicators);
    });
    positionIndicators(ul);
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
      slided += (-toBeSlided / timeout) * animationInterval;
      slide.style.left = slided + 'px';
    }, animationInterval);

    changeIndication();
    setTimeout(function() {
      clearInterval(animateID);
      sliding = false;
      buttonStatus(sliding);
    }, timeout);
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
      slided += (-toBeSlided / timeout) * animationInterval;
      slide.style.left = slided + 'px';
    }, animationInterval);

    changeIndication();
    setTimeout(function() {
      clearInterval(animateID);
      sliding = false;
      buttonStatus(sliding);
    }, timeout);
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
      slided -= (toBeSlided / timeout) * animationInterval;
      slide.style.left = slided + 'px';
    }, animationInterval);
    counter = ind;

    changeIndication();
    setTimeout(function() {
      clearInterval(indicatorID);
      sliding = false;
      buttonStatus(sliding);
    }, timeout);
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
