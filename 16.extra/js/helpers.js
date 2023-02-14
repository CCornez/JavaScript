function preloadImage(src) {
  return new Promise(function (res, rej) {
    const img = new Image();
    img.src = src;
    img.onload = res;
    img.onerror = rej;
  });
}

function setToLocalStorage(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

function getFromLocalStorage(name) {
  return window.localStorage.getItem(name);
}

export { preloadImage, setToLocalStorage, getFromLocalStorage };
