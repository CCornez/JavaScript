import FriendsList from './FriendsList';

describe('FRIENDSLIST CLASS', () => {
  test('create a new FriendsList with 2 people and return their names in lowercase', () =>
    expect(
      new FriendsList()
        .add('Cyril', 25)
        .add('David', 40)
        .list.map((el) => el.name)
        .join(',')
        .toLowerCase()
    ).toBe('cyril,david'));

  test('create a new FriendsList with 2 people and return the sum of their age', () =>
    expect(
      new FriendsList()
        .add('Cyril', 25)
        .add('David', 40)
        .list.reduce((acc, el) => acc + el.age, 0)
    ).toBe(65));

  test('remove a friend', () => {
    const myList = new FriendsList().add('Cyril', 25).add('David', 40);
    myList.remove(myList.list[0].id);
    expect(myList.list[0].name).toBe('David');
  });
  test('make person one year older', () => {
    const myList = new FriendsList().add('Cyril', 25).add('David', 40);
    myList.age(myList.list[0].id);
    expect(myList.list[0].age).toBe(26);
  });
  test('change name of person', () => {
    const myList = new FriendsList().add('Cyril', 25).add('David', 40);
    myList.changeName(myList.list[0].id, 'Petra');
    expect(myList.list[0].name).toBe('Petra');
  });
  test('add random star wars in FriendList', async () => {
    const myList = new FriendsList();
    myList.add('Mehdi', 16);
    await myList.starWars();
    expect(myList.list.length > 1).toBe(true);
  });
});
