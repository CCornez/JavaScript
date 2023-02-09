import '../css/style.scss';
import axios from 'axios';

const ulRef = document.querySelector('ul.todoapp__list');
const listItemTemplateRef = document.querySelector('#list-item');
const listItemTemplateHTML = listItemTemplateRef.innerHTML;

async function main() {
  const todos = await axios('http://localhost:3000/todos').then(
    (res) => res.data
  );

  ulRef.innerHTML = todos
    .map(({ id, todo, checked }) =>
      listItemTemplateHTML
        .replace('%ID%', id)
        .replace('%TODO%', todo)
        .replace('%CHECKED%', checked ? 'todoapp__list__item--checked' : '')
    )
    .join('');
}

main();

// Toggle check

ulRef.addEventListener('click', async (e) => {
  if (e.target.matches('button.check')) {
    const li = e.target.parentElement;
    li.classList.toggle('todoapp__list__item--checked');
    const checked = li.classList.contains('todoapp__list__item--checked');
    try {
      await axios.patch('http://localhost:3000/todos/' + li.dataset.id, {
        checked,
      });
    } catch (error) {
      console.error('error');
    }
  }
  // DELETE TODOS
  if (e.target.matches('button.delete')) {
    const li = e.target.parentElement;
    try {
      await axios.delete('http://localhost:3000/todos/' + li.dataset.id);
      main();
    } catch (error) {
      console.error('error');
    }
  }
});

// ADD TODO

const formRef = document.querySelector('.todoapp__form');
const inputRef = document.querySelector('.todoapp__form__input');

formRef.addEventListener('submit', async (e) => {
  e.preventDefault();
  const todo = inputRef.value;
  if (todo) {
    inputRef.classList.remove('todoapp__form__input--error');
    try {
      await axios.post('http://localhost:3000/todos', {
        todo,
        checked: false,
      });
    } catch (error) {
      console.error('error');
    }
    inputRef.value = '';
    main();
  } else {
    inputRef.classList.add('todoapp__form__input--error');
  }
});
