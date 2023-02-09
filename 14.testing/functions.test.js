import { product, sum } from './functions.js';

//SUM
describe('SUM FUNCTION', () => {
  test('adds 1 + 2 to equal 3', () => expect(sum(1, 2)).toBe(3));

  test('sum with no arguments should return error', () =>
    expect(() => sum()).toThrow('first required argument is not provided'));

  test('sum with 1 argument should return error', () =>
    expect(() => sum(1)).toThrow('second required argument is not provided'));
});

//PRODUCT

describe('PRODUCT FUNCTION', () => {
  test('product of 3 * 2 to equal 6', () => expect(product(3, 2)).toBe(6));

  test('product with no arguments should return error', () =>
    expect(() => product()).toThrow('first required argument is not provided'));

  test('sum with 1 argument should return error', () =>
    expect(() => product(1)).toThrow(
      'second required argument is not provided'
    ));
});
