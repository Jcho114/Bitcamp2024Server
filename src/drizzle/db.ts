import postgres from "postgres";
import dotenv from "dotenv";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";

dotenv.config();

const client = postgres(process.env.DB_URL as string);
const db = drizzle(client, { schema });

export default db;