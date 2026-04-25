import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { userId: string };
}
export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No Token Provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey",
    ) as { userId: string };

    req.user = { userId: decoded.userId };

    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
