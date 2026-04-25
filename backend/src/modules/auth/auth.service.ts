import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type { PrismaClient } from '../../generated/prisma/client.js';
import type {
  LoginDto,
  RegisterDto,
} from './auth.dto.js';

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async register(data: RegisterDto) {
    const { firstname, lastname, email, password } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" },
    );

    return { user, token };
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;

    return { user: safeUser, token };
  }
}
