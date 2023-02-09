import randomColor from 'randomcolor';
import { randomInt } from './helpers';

class Square {
  constructor(options = {}) {
    this.holder = options.holder || document.body;
    this.size = options.size || randomInt(10, 200);
    this.x = options.x || randomInt(0, window.innerWidth - this.size);
    this.y = options.y || randomInt(0, window.innerHeight - this.size);
    this.color = options.color || randomColor();
    this.clicked = 0;
    this.htmlRef = this.generateInitialHTML();
    this.setStyling();
    this.setEvents();
    // this.animationLoop();
  }
  generateInitialHTML() {
    this.holder.insertAdjacentHTML(
      'beforeend',
      `<div class='square' >${this.clicked}</div>`
    );
    return this.holder.querySelector(':last-child');
  }
  setStyling() {
    const styles = {
      position: 'absolute',
      width: this.size + 'px',
      height: this.size + 'px',
      backgroundColor: this.color,
      top: this.y + 'px',
      left: this.x + 'px',
    };
    Object.assign(this.htmlRef.style, styles);
  }
  updateNumber() {
    this.clicked++;
    this.htmlRef.innerText = this.clicked;
  }
  updateStyle() {
    this.color = randomColor();
    this.size = randomInt(10, 200);
    this.x = randomInt(0, window.innerWidth - this.size);
    this.y = randomInt(0, window.innerHeight - this.size);
    this.setStyling();
  }
  setEvents() {
    this.htmlRef.addEventListener('click', () => {
      this.updateNumber();
      this.updateStyle();
    });
  }
  animationLoop() {
    setInterval(() => {
      document.body.style.backgroundColor = randomColor();
    }, 1000);
  }
}

export default Square;
