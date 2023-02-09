const arrowLeftRef = document.querySelector('.arrow.left');
const arrowRightRef = document.querySelector('.arrow.right');
const ulRef = document.querySelector('ul');

let pos = 0;
let maxPos = ulRef.childElementCount - 1;

const moveLeft = () => {
  if (pos > 0) {
    pos--;
    //   arrowRightRef.classList.remove('hidden');
    // if (pos == 0) {
    //   arrowLeftRef.classList.add('hidden');
    // }
  } else {
    pos = maxPos;
  }
  move();
};
const moveRight = () => {
  if (pos < maxPos) {
    pos++;
    //  arrowLeftRef.classList.remove('hidden');
    // if (pos == maxPos) {
    //   arrowRightRef.classList.add('hidden');
    // }
  } else {
    pos = 0;
  }
  move();
};

const move = () => {
  ulRef.style.transform = `translateX(${-800 * pos}px)`;
};

arrowLeftRef.addEventListener('click', moveLeft);
arrowRightRef.addEventListener('click', moveRight);
