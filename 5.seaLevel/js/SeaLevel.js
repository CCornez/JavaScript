class SeaLevel {
  #height;
  #color;
  #htmlRef;
  #counter;
  constructor() {
    this.#height = 10;
    this.#color = '#7ce3ff';
    this.#counter = 0;
    this.#htmlRef = this.#initHTML();
    this.#setStyle();
    this.#setEvents();
  }
  #initHTML = () => {
    document.body.insertAdjacentHTML('beforeend', '<div></div>');
    return document.body.querySelector(':last-child');
  };
  #setStyle = () => {
    const style = {
      position: 'absolute',
      width: '100vw',
      top: 100 - this.#height + 'vh',
      height: this.#height + 'vh',
      backgroundColor: this.#color,
    };
    Object.assign(this.#htmlRef.style, style);
  };
  #setEvents = () => {
    this.#htmlRef.addEventListener('click', this.#updateCounter);
  };

  #updateCounter = () => {
    this.#counter++;
    this.#height += 10;
    this.#playSound(
      'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-84577/zapsplat_nature_ocean_waves_gentle_sandy_beach_distant_surf_winter_australia_84765.mp3',
      true
    );
    if (this.#counter == 5) {
      this.#color = '#2d56fc';
    } else if (this.#counter == 9) {
      this.#color = '#ff7777';
      this.#htmlRef.removeEventListener('click', this.#updateCounter);
      this.#playSound(
        'https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3'
      );
    }
    console.log(this.#counter);
    this.#setStyle();
  };
  #playSound = (url, fadeOut = false) => {
    const audio = new Audio(url);
    audio.play();
    if (fadeOut) {
      const interval = setInterval(() => {
        audio.volume -= 0.05;
        if (audio.volume < 0.05) {
          audio.pause();
          clearInterval(interval);
        }
      }, 100);
    }
  };
}

export default SeaLevel;
