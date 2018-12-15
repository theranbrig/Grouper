import casual from 'casual';

casual.seed(777);

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  username: casual.name,
  email: casual.email,
  password: 'password',
  permissions: ['USER'],
});

const fakeItem = () => ({
  __typename: 'ListItem',
  id: '3534',
  name: 'Habaneros',
  price: 12,
  list: '1234567890',
  user: fakeUser(),
  inCart: false,
});

const fakeList = () => ({
  __typename: 'List',
  id: '01234567890',
  users: [fakeUser()],
  name: 'Grocery List',
  type: 'Groceries',
  items: [fakeItem()],
});

export { fakeList, fakeUser, fakeItem };
