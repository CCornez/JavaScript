import '../css/style.scss';

const checkBtnRefs = document.querySelectorAll('.todoapp__list__item .check');

checkBtnRefs.forEach((checkBtnRef) =>
  checkBtnRef.addEventListener('click', (e) =>
    e.currentTarget.parentElement.classList.toggle(
      'todoapp__list__item--checked'
    )
  )
);
