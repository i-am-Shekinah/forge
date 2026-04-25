import type {
  Request,
  Response,
} from 'express';

import { prisma } from '../../lib/prisma.js';
import {
  loginSchema,
  registerSchema,
} from './auth.schema.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(prisma);

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const parsed = registerSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.flatten(),
        });
      }

      const result = await authService.register(parsed.data);

      res.status(201).json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      res.status(400).json({
        message,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const parsed = loginSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.flatten(),
        });
      }

      const result = await authService.login(parsed.data);

      res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      res.status(400).json({
        message,
      });
    }
  }
}
