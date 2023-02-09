class Crosshair {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.audio = new Audio('/audio/shot.mp3');
    this.ref = this.init();
    this.events();
  }
  init() {
    document.body.insertAdjacentHTML(
      'afterbegin',
      `<div class="crosshair"></div>`
    );
    return document.querySelector('.crosshair');
  }
  style() {
    this.ref.style.top = this.y + 'px';
    this.ref.style.left = this.x + 'px';
  }
  events() {
    document.body.addEventListener('mousemove', (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.style();
    });
    document.body.addEventListener('click', () => {
      this.audio.currentTime = 0;
      this.audio.play();
    });
  }
}
export default Crosshair;
