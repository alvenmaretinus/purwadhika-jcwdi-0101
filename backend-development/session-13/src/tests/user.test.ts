import request from 'supertest';
import app from '../app';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

describe('GET /api/users', () => {
  const sampleUsers = [
    {
      id: 134,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 28787,
      firstName: 'Andy',
      lastName: 'Doe',
      email: 'andye@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      await prisma.user.createMany({
        data: sampleUsers,
      });
    }
  });

  afterEach(async () => {
    await prisma.user.deleteMany({ where: { id: { in: [134, 28787] } } });
  });

  afterAll(async () => {
    prisma.$disconnect();
  });

  it('should return an array of users', async () => {
    let response: any = await request(app).get('/api/users');

    // response doesnt return Date, need to cast it back to Date type
    response = {
      ...response,
      body: {
        ...response.body,
        users: response.body.users.map((user: User) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        })),
      },
    };

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'OK', users: sampleUsers });
  });
});
