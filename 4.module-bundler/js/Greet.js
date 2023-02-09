class Greet {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `Hello ${this.name}, how are you today ?`;
  }
}

export default Greet;
