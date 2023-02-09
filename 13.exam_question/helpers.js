function getAverage(arr) {
  const sum = arr.reduce((acc, el) => (acc += el));
  return Math.round(sum / arr.length);
}

export { getAverage };
