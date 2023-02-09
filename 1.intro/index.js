console.log('test');

console.log('getElementById:\n', document.getElementById('paragraph'));
console.log(
  'getElementsByClassName:\n',
  document.getElementsByClassName('test')
);

console.log('querySelector:\n', document.querySelector('.test'));
console.log('querySelectorAll:\n', document.querySelectorAll('.test'));

document
  .querySelectorAll('.test')
  .forEach((el, i) => console.log(`element ${i + 1}:\n`, el));

/**
 *
 */

let count = 0;
const h1handler = () => console.log('clicked h1');
const phandler = () => {
  count++;
  count === 5
    ? (document.querySelector('#paragraph').onclick = () => null)
    : console.log('clicked p');
};

document.querySelector('#paragraph').onclick = phandler;

document.querySelector('h1').addEventListener('click', h1handler);

/**
 *
 */

const h1ref = document.querySelector('h1');
const pref = document.querySelector('p');

h1ref.addEventListener('click', () => (pref.style.backgroundColor = 'yellow'));

pref.addEventListener('click', () => h1ref.classList.toggle('purpleWay'));
