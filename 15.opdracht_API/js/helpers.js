function sortArrayOfObject(arr, value) {
  return arr.sort((a, b) => {
    if (a[value] < b[value]) {
      return -1;
    }
    if (a[value] > b[value]) {
      return 1;
    }
    return 0;
  });
}

function getTime(date) {
  date = new Date(date * 1000).toLocaleString('fr-BE');
  const time = date.substring(11, 16);
  return time;
}

export { sortArrayOfObject, getTime };
