/**
 * ScrenStart holds the initial screen for game to load.
 * @class ScreenStart
 */
class ScreenStart {
  /**
   * Creates an instance of ScreenStart.
   * @param {HTMLElement} parent
   * @memberof ScreenStart
   */
  constructor(parent) {
    this.element = null;
    this.parent = parent;
    this.tapInterval = null;
    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;

    this.createStart();
    this.styleStart();
    this.eventListeners();
  }

  /**
   * Creates the different elements required to complete the start screen.
   * @memberof ScreenStart
   */
  createStart() {
    this.element = document.createElement('div');
    this.tapToStart = document.createElement('p');

    this.element.appendChild(this.tapToStart);
    this.parent.appendChild(this.element);
  }

  /**
   * Styles the different elements created.
   * @memberof ScreenStart
   */
  styleStart() {
    this.parent.style.overflow = 'hidden';

    this.element.style.position = 'relative';
    this.element.style.width = GAME_WIDTH + 'px';
    this.element.style.height = GAME_HEIGHT + 'px';
    this.element.style.backgroundImage = 'url(images/splash.png)';
    this.element.style.backgroundPosition = 'center';
    this.element.style.backgroundSize = '100%';

    this.tapToStart.style.position = 'relative';
    this.tapToStart.style.fontFamily = 'Helvetica, sans-serif';
    this.tapToStart.style.fontSize = (20 / 640) * GAME_WIDTH + 'px';
    this.tapToStart.style.fontWeight = 500;
    this.tapToStart.style.color = 'rgba(255, 255, 255, 0)';
    this.tapToStart.innerText = 'Tap to start';
    this.tapToStart.style.cursor = 'pointer';
  }

  /**
   * Event listeners for the elements of start screen.
   * @memberof ScreenStart
   */
  eventListeners() {
    this.tapToStart.style.top = (202 / 640) * GAME_WIDTH + 'px';
    var flashing = 0;
    var flag = true;
    this.tapInterval = setInterval(() => {
      if (flag) flashing++;
      else flashing--;
      var grad = flashing / 10;
      this.tapToStart.style.color = 'rgba(87,83,83,' + grad + ')';
    }, 100);
    this.flagInterval = setInterval(() => {
      flag = !flag;
    }, 1000);
  }
}
