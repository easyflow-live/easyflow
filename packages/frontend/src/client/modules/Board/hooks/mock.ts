import { Board } from '../domain/types'

export const membersMock = [
  {
    id: '123',
    username: 'boladao',
    image:
      'https://lh6.googleusercontent.com/-h2IPoI5B8Vw/AAAAAAAAAAI/AAAAAAAA5Wg/ifYpCopFSkE/photo.jpg',
  },
  {
    id: '1234',
    username: 'boladao2',
    image:
      'https://lh3.googleusercontent.com/-kIF_9pKHlnk/AAAAAAAAAAI/AAAAAAAAEIY/rsn2zRwrXwg/photo.jpg',
  },
  {
    id: '12345',
    username: 'boladao3',
    image:
      'https://lh3.googleusercontent.com/-SYdK9Ptjm90/AAAAAAAAAAI/AAAAAAAABN4/xPgWgPqmvig/photo.jpg',
  },
  {
    id: '123456',
    username: 'boladao3',
    image:
      'https://lh3.googleusercontent.com/-SYdK9Ptjm90/AAAAAAAAAAI/AAAAAAAABN4/xPgWgPqmvig/photo.jpg',
  },
  {
    id: '123457',
    username: 'boladao3',
    image:
      'https://lh3.googleusercontent.com/-SYdK9Ptjm90/AAAAAAAAAAI/AAAAAAAABN4/xPgWgPqmvig/photo.jpg',
  },
  {
    id: '123458',
    username: 'boladao3',
    image:
      'https://lh3.googleusercontent.com/-SYdK9Ptjm90/AAAAAAAAAAI/AAAAAAAABN4/xPgWgPqmvig/photo.jpg',
  },
  {
    id: '123459',
    username: 'boladao3',
    image:
      'https://lh3.googleusercontent.com/-SYdK9Ptjm90/AAAAAAAAAAI/AAAAAAAABN4/xPgWgPqmvig/photo.jpg',
  },
  {
    id: '1234510',
    username: 'boladao3',
    image:
      'https://lh3.googleusercontent.com/-SYdK9Ptjm90/AAAAAAAAAAI/AAAAAAAABN4/xPgWgPqmvig/photo.jpg',
  },
]

export const boards: Board[] = [
  {
    id: 'abc',
    createdAt: new Date(),
    name: 'Board 1',
    ownerId: '1',
    updatedAt: new Date(),
    visibility: 'public',
    members: membersMock,
  },
  {
    id: 'abcd',
    createdAt: new Date(),
    name: 'Board 2',
    ownerId: '1',
    updatedAt: new Date(),
    visibility: 'private',
    members: [],
  },
  {
    id: 'abcde',
    createdAt: new Date(),
    name: 'Board 3',
    ownerId: '1',
    updatedAt: new Date(),
    visibility: 'public',
    members: [],
  },
]
