export const getRandomString = () => Math.random().toString(36).substring(2);

export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
