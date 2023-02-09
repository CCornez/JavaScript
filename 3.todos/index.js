let todos = [
  {
    id: 1,
    todo: 'check pc',
    checked: false,
  },
  {
    id: 2,
    todo: 'clean house',
    checked: true,
  },
  {
    id: 3,
    todo: 'learn something',
    checked: false,
  },
  {
    id: 5,
    todo: 'think',
    checked: true,
  },
];

const ulRef = document.querySelector('ul');
const formRef = document.querySelector('form');
const inputRef = document.querySelector('form input');

const renderTodo = () => {
  ulRef.innerHTML = '';
  ulRef.insertAdjacentHTML(
    'afterbegin',
    todos
      .map((el) => {
        return `
      <li data-id=${el.id} class="${el.checked ? 'checked' : ''}">
      <span>${el.todo}</span>
      <a href="#" class="delete">❌</a>
      <a href="#" class="check">✔</a>
      </li>
      `;
      })
      .join('')
  );
};

renderTodo();

const addTodo = () => {
  todos.push({
    id: Math.random().toString(36).substring(2),
    todo: inputRef.value,
    checked: false,
  });
  inputRef.value = '';
  renderTodo();
};

const checkTodo = (id) => {
  todos = todos.map((el) =>
    el.id == id ? { id: el.id, todo: el.todo, checked: !el.checked } : el
  );
  renderTodo();
};

const removeTodo = (id) => {
  todos = todos.filter((el) => el.id != id);
  renderTodo();
};

formRef.addEventListener('submit', (e) => {
  e.preventDefault();
  inputRef.value && addTodo();
});

ulRef.addEventListener('click', (e) => {
  if (e.target.className === 'check') {
    checkTodo(e.target.parentElement.dataset.id);
  }
  if (e.target.className === 'delete') {
    removeTodo(e.target.parentElement.dataset.id);
  }
});
