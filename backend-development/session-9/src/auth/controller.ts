import { PrismaClient } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, decode } from 'jsonwebtoken';
import { User } from '../types/user';
import 'dotenv/config';

const prisma = new PrismaClient();

const userModelQueryFields = { email: true, name: true };
const forbiddenFields = { password: true };

export const register = async (user: User) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
      omit: forbiddenFields,
    });

    if (existingUser) {
      throw new Error('Email has been used');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    return newUser;
  } catch (error) {
    return {
      error,
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await compare(password, user?.password))) {
      throw new Error('Invalid email or password');
    }

    // set session
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };

    // const token = sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1s' });
    const token = sign(jwtPayload, 'supersecretkey', { expiresIn: '1h' });

    return {
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    };
  } catch (error) {
    return {
      error,
    };
  }
};
