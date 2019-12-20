/**
 * This is the actual implementation of the game.
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   * @param {HTMLElement} parent is the container for the game.
   * @memberof Game
   */
  constructor(parent) {
    this.element = null;
    this.parent = parent;
    this.animate = false;
    this.levelScreen = new ScreenLevel(parent);

    this.createElements();
    this.styleElements();
    this.eventListeners();
    this.levelScreen.levelImages.forEach((imgDiv, index) => {
      imgDiv.addEventListener('click', () => {
        this.styleShowLevel();

        localStorage.setItem('level', index + 1);
        this.createLevel();
        this.canvasRedraw();
      });
    });
  }

  /**
   * Creates elements for the game
   * @memberof Game
   */
  createElements() {
    this.element = document.createElement('div');
    this.backDiv = document.createElement('div');
    this.backImg = document.createElement('img');
    this.backImg.src = 'images/backBtn.png';
    this.reloadDiv = document.createElement('div');
    this.reloadImg = document.createElement('img');
    this.reloadImg.src = 'images/reloadBtn.png';

    this.backDiv.appendChild(this.backImg);
    this.reloadDiv.appendChild(this.reloadImg);
    this.element.appendChild(this.backDiv);
    this.element.appendChild(this.reloadDiv);
    this.parent.appendChild(this.element);
  }

  /**
   * Styles the created elements for the game
   * @memberof Game
   */
  styleElements() {
    this.element.style.marginTop = GAME_HEIGHT + 'px';

    this.backDiv.style.position = 'absolute';
    this.backDiv.style.top = 14 + this.parent.offsetTop + 'px';
    this.backDiv.style.left = 24 + this.parent.offsetLeft + 'px';
    this.backDiv.style.cursor = 'pointer';
    this.backImg.style.width = (23 / 640) * GAME_WIDTH + 'px';
    this.backDiv.style.display = 'none';

    let width = (38 / 360) * GAME_HEIGHT;
    this.reloadDiv.style.position = 'absolute';
    this.reloadDiv.style.top = 14 + this.parent.offsetTop + 'px';
    this.reloadDiv.style.left =
      GAME_WIDTH + this.parent.offsetLeft - width - 14 + 'px';
    this.reloadDiv.style.cursor = 'pointer';
    this.reloadImg.style.width = (38 / 360) * GAME_HEIGHT + 'px';
    this.reloadDiv.style.display = 'none';
  }

  /**
   * Responsible for styling the levels choice screen to hidden and
   * the game level to be shown
   * @memberof Game
   */
  styleShowLevel() {
    this.levelScreen.element.style.display = 'none';
    this.levelScreen.element.style.visibility = 'hidden';

    this.parent.style.padding = '0px';
    this.parent.style.width = GAME_WIDTH + 'px';
    this.parent.style.height = GAME_HEIGHT + 'px';

    this.element.style.marginTop = 0 + 'px';

    this.backDiv.style.display = 'block';
    this.reloadDiv.style.display = 'block';
  }

  /**
   * Responsible for styling the game level screen to hidden and
   * the levels choice to be shown
   * @memberof Game
   */
  styleHideLevel() {
    this.levelScreen.element.style.display = 'block';
    this.levelScreen.element.style.visibility = 'visible';

    let padding = (30 * GAME_WIDTH) / 640;
    this.parent.style.padding = padding + 'px';
    this.parent.style.width = GAME_WIDTH - 2 * padding + 'px';
    this.parent.style.height = GAME_HEIGHT - 2 * padding + 'px';

    this.element.style.marginTop = GAME_HEIGHT + 'px';

    this.backDiv.style.display = 'none';
    this.reloadDiv.style.display = 'none';
  }

  /**
   * Adds and removes the event listeners accordingly
   * @memberof Game
   */
  eventListeners() {
    this.backDiv.addEventListener('click', event => {
      this.styleHideLevel();
    });

    this.reloadDiv.addEventListener('click', () => {
      this.createLevel();
      this.canvasRedraw();
    });
  }

  /**
   * Responsible for request animation frame.
   * @memberof Game
   */
  canvasRedraw = () => {
    this.canvas = this.level.getCanvas();

    let redraw = () => {
      this.level.redraw();
      this.animate = true;
    };
    let removeEvent = () => {
      if (this.animate) {
        this.canvas.removeEventListener('mouseup', redraw);
        this.canvas.removeEventListener('mousemove', removeEvent);
      }
    };
    this.canvas.addEventListener('mouseup', redraw);
    this.canvas.addEventListener('mousemove', removeEvent);
  };

  /**
   * Creates ball according to the level
   * @memberof Game
   */
  createLevel() {
    let getLevel = parseInt(localStorage.getItem('level'));

    if (this.level) {
      this.level.removeSelf();
      this.animate = false;
      cancelAnimationFrame(this.level.animationRequest);
      this.level = null;
    }

    if (getLevel === 1) {
      this.level = new Level1(this.element);
      this.level.sendBackBtn(this.backDiv);
    } else if (getLevel === 2) {
      if (this.level) this.level.removeSelf();
      this.level = new Level2(this.element);
      this.level.sendBackBtn(this.backDiv);
    } else if (getLevel === 3) {
      if (this.level) this.level.removeSelf();
      this.level = new Level3(this.element);
      this.level.sendBackBtn(this.backDiv);
    }
  }
}
