function sum(a, b) {
  if (!a) {
    throw new Error('first required argument is not provided');
  }
  if (!b) {
    throw new Error('second required argument is not provided');
  }
  return a + b;
}

function product(a, b) {
  if (!a) {
    throw new Error('first required argument is not provided');
  }
  if (!b) {
    throw new Error('second required argument is not provided');
  }
  return a * b;
}
export { sum, product };
