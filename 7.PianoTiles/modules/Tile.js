import randomColor from 'randomcolor';

class Tile {
  constructor() {
    this.color = randomColor();
    this.ref = this.init();
    this.styling();
  }
  init() {
    document.body.insertAdjacentHTML('beforeend', `<div class="tile"></div>`);
    return document.querySelector('.tile:last-child');
  }
  styling() {
    this.ref.style.backgroundColor = this.color;
  }
}

export default Tile;
