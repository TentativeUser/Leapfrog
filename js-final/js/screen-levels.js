/**
 * ScrenLevel holds the levels screen for game to load level.
 * @class ScreenLevel
 */
class ScreenLevel {
  /**
   * Creates an instance of ScreenLevel.
   * @param {HTMLElement} parent it is container for the screen elements.
   * @memberof ScreenLevel
   */
  constructor(parent) {
    this.parent = parent;
    this.element = null;
    this.imagesNames = ['level1.png', 'level2.png', 'level3.png'];
    this.images = [];
    this.levelImages = [];

    this.createScreenElement();
    this.styleScreenElement();
  }

  /**
   * Creates the elements required for screen.
   * @memberof ScreenLevel
   */
  createScreenElement() {
    this.element = document.createElement('div');
    this.logo = new Image();
    this.logo.src = 'images/logo.png';
    this.element.appendChild(this.logo);
    this.imagesNames.forEach((imageName, index) => {
      let imgDiv = document.createElement('div');
      imgDiv.style.backgroundImage = `url(images/level${index + 1}_win.png`;
      imgDiv.style.backgroundSize = 'contain';
      let img = new Image();
      let src = localStorage.getItem(`level${index + 1}`);
      img.src = src ? src : 'images/' + imageName;
      img.style.width = '100%';
      img.style.height = '100%';

      this.images.push(img);
      this.levelImages.push(imgDiv);
      imgDiv.appendChild(img);
      this.element.appendChild(imgDiv);
    });
    this.coinDiv = document.createElement('div');
    this.coins = document.createElement('span');
    this.coinDiv.innerText = 'Coins: ';
    this.calculateCoins();
    this.coinDiv.appendChild(this.coins);
    this.element.appendChild(this.coinDiv);

    setInterval(() => {
      this.images.forEach((img, index) => {
        let src = localStorage.getItem(`level${index + 1}`);
        img.src = src ? src : 'images/' + this.imagesNames[index];
        this.calculateCoins();
      });
    }, 1000);
    this.parent.appendChild(this.element);
  }

  /**
   * Styles the elements of the screen.
   * @memberof ScreenLevel
   */
  styleScreenElement() {
    this.parent.style.textAlign = 'left';
    let padding = (30 * GAME_WIDTH) / 640;
    this.parent.style.padding = padding + 'px';
    this.parent.style.width = GAME_WIDTH - 2 * padding + 'px';
    this.parent.style.height = GAME_HEIGHT - 2 * padding + 'px';

    this.logo.style.display = 'block';
    this.logo.style.width = (184 / 640) * GAME_WIDTH + 'px';
    this.levelImages.forEach(imgDiv => {
      imgDiv.style.display = 'inline-block';
      imgDiv.style.position = 'relative';
      imgDiv.style.margin = (16 / 640) * GAME_WIDTH + 'px';
      imgDiv.style.width = (160 / 640) * GAME_WIDTH + 'px';
      imgDiv.style.height = (90 / 640) * GAME_WIDTH + 'px';
      imgDiv.style.cursor = 'pointer';
    });
  }

  calculateCoins() {
    let coins = 0;
    let level1_win, level2_win, level3_win;
    level1_win = localStorage.getItem('level1');
    level2_win = localStorage.getItem('level2');
    level3_win = localStorage.getItem('level3');
    coins += level1_win ? 50 : 0;
    coins += level2_win ? 50 : 0;
    coins += level3_win ? 50 : 0;
    this.coins.innerText = coins;
  }
}
