import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './docs/swagger.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/user.routes.js';

const app = express();

app.use(express.json());

// Swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

export default app;
