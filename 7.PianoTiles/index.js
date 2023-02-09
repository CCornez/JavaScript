import './styles.scss';
import Tile from './modules/Tile.js';

const allTiles = [];

document.body.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    allTiles.push(new Tile());
  }
  if (allTiles.length == 1) {
    document.body.style.backgroundColor = allTiles[0].color;
  } else if (allTiles.length == 2) {
    let i = 0;
    let interval = 500;
    setInterval(() => {
      i == allTiles.length ? (i = 0) : i;
      let tile = allTiles[i];
      tile.ref.classList.add('active');
      document.body.style.backgroundColor = tile.color;
      setTimeout(() => {
        tile.ref.classList.remove('active');
      }, interval);
      i++;
    }, interval);
  }
});
