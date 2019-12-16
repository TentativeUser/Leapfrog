const GAME_WIDTH = 640;
const GAME_HEIGHT = (9 * GAME_WIDTH) / 16;
const GRAVITY = 9.81;

class GameLoader {
  /**
   *Creates an instance of GameLoader.
   * @param {String} selector css selector for the game to load on.
   * @memberof GameLoader
   */
  constructor(selector) {
    let container;
    if (selector.startsWith('.', 0)) {
      selector = selector.replace('.', '');
      container = document.getElementsByClassName(selector);
    } else if (selector.startsWith('#', 0)) {
      selector = selector.replace('#', '');
      container = document.getElementById(selector);
    } else {
      container = document.getElementsByClassName(selector);
    }
    container = document.getElementsByClassName(selector);

    this.createGames(container);
  }

  /**
   * Creates the game.
   * @param {HTMLElement} container the game conatainer.
   * @memberof GameLoader
   */
  createGames = container => {
    Array.from(container).forEach(value => {
      this.styleContainer(value);
      let screenStart = new ScreenStart(value);
      screenStart.element.addEventListener('click', e => {
        clearInterval(screenStart.tapInterval);
        clearInterval(screenStart.flagInterval);
        while (value.hasChildNodes()) {
          value.removeChild(value.lastChild);
        }
        new Game(value);
      });
    });
  };

  /**
   * Styles the game container.
   * @param {HTMLElement} container the game container.
   * @memberof GameLoader
   */
  styleContainer = container => {
    container.style.display = 'inline-block';
    container.style.border = '1px solid #000000';
    container.style.verticalAlign = 'middle';
    container.style.width = GAME_WIDTH + 'px';
    container.style.height = GAME_HEIGHT + 'px';
    container.style.backgroundImage = 'url(images/box_pattern.png)';
    container.style.backgroundPosition = 'center';
    container.style.overflow = 'hidden';
  };
}

new GameLoader('game_container');
