import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { hashPassword, comparePassword } from "./password";

export const auth = betterAuth({
  database: new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME,
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: ({ password, hash }) => comparePassword(password, hash),
    },
  },
});