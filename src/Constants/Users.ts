export interface IUsers {
  users: string[];
  id: string;
}

export const Users: IUsers[] = [
  {
    users: ['1', '2'],
    id: 'user1&user2',
  },
  {
    users: ['1', '3'],
    id: 'user1&user3',
  },
  {
    users: ['2', '3'],
    id: 'user2&user3',
  },
  {
    users: ['1', '2', '3'],
    id: '111111',
  },
];
