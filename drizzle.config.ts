import fs from 'fs';
export default {
  schema: './src/db/schemas/*.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DRIZZLE_PORT,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('./ca.pem').toString(),
    },
  },
};
