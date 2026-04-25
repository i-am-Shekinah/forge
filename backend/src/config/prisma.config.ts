import 'dotenv/config';

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {
  defineConfig,
  env,
} from 'prisma/config';

// Check if root .env exists (local) otherwise fallback to current dir (Docker)
const envPath = fs.existsSync(path.resolve(process.cwd(), "../.env"))
? path.resolve(process.cwd(), "../.env")
: path.resolve(process.cwd(), ".env");

dotenv.config({ path: envPath });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
