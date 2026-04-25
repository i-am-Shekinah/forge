import { Router } from 'express';

import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  return res.json({
    message: "User route is working!",
    user: req.user,
  });
});

export default router;
