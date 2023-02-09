import topbar from 'topbar';
import fetcher from './fetcher';
import '../css/style.scss';

const ulRef = document.querySelector('ul.todoapp__list');
const listItemTemplateRef = document.querySelector('#list-item');
const listItemTemplateHTML = listItemTemplateRef.innerHTML;

// get todos

async function getTodos() {
  const todos = await fetcher('/').then((res) => res.data);

  ulRef.innerHTML = todos
    .map(({ id, todo, checked }) =>
      listItemTemplateHTML
        .replace('%ID%', id)
        .replace('%TODO%', todo)
        .replace('%CHECKED%', checked ? 'todoapp__list__item--checked' : '')
    )
    .join('');
  topbar.hide();
}

getTodos();

ulRef.addEventListener('click', async (e) => {
  topbar.show();
  // PATCH TODOS
  const checkRef = e.target.closest('button.check');
  if (checkRef) {
    const li = checkRef.parentElement;
    try {
      li.classList.toggle('todoapp__list__item--checked');
      const checked = li.classList.contains('todoapp__list__item--checked');
      await fetcher.patch('/' + li.dataset.id, {
        checked,
      });
    } catch (error) {
      console.error(error);
    }
  }
  // DELETE TODOS
  const deleteRef = e.target.closest('button.delete');
  if (deleteRef) {
    const li = deleteRef.parentElement;
    try {
      await fetcher.delete('/' + li.dataset.id);
      getTodos();
    } catch (error) {
      console.error(error);
    }
  }
});

// ADD TODO

const formRef = document.querySelector('.todoapp__form');
const inputRef = document.querySelector('.todoapp__form__input');

formRef.addEventListener('submit', async (e) => {
  topbar.show();
  e.preventDefault();
  const todo = inputRef.value;
  if (todo) {
    inputRef.classList.remove('todoapp__form__input--error');
    try {
      await fetcher.post('/', {
        todo,
      });
    } catch (error) {
      console.error('error');
    }
    inputRef.value = '';
    getTodos();
  } else {
    inputRef.classList.add('todoapp__form__input--error');
  }
});
