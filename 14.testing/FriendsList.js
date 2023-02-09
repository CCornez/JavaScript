import axios from 'axios';
import { nanoid, random } from 'nanoid';

class FriendsList {
  constructor() {
    this.list = [];
  }
  add(name, age) {
    this.list.push({
      id: nanoid(),
      name,
      age,
    });
    return this;
  }
  changeName(id, name) {
    this.list.find((el) => el.id === id).name = name;
  }
  async starWars() {
    const { data } = await axios(
      `https://swapi.dev/api/people/${Math.ceil(Math.random() * 83)}`
    );
    this.add(data.name, 10);
    return this;
  }
  remove(id) {
    this.list = this.list.filter((el) => el.id !== id);
    return this;
  }
  age(id) {
    this.list.find((el) => el.id === id).age++;
  }
}

export default FriendsList;
