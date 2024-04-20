import { eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { CreateUser, UserTable } from "../../drizzle/schema";
import authService from "../auth/auth.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

async function createUser(user: CreateUser) {
  // TODO - Handle duplicate emails
  const data = await db.insert(UserTable)
    .values(user)
    .returning({ id: UserTable.id });
  return data[0];
}

async function getUserById(id: string) {
  const data = await db.select()
    .from(UserTable)
    .where(eq(UserTable.id, id));
  return data ? data[0] : null;
}

async function getUserByEmail(email: string) {
  const data = await db.select()
    .from(UserTable)
    .where(eq(UserTable.email, email));
  return data ? data[0] : null;
}

function generateToken(payload: object) {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

// TODO - Implement refresh tokens later
async function signup(name: string, email: string, plainPassword: string) {
  const hashedPassword = authService.hashPassword(plainPassword);
  const user = await getUserByEmail(email);
  if (!user) {
    const id = await createUser({
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    });
    return generateToken({ id: id });
  }
}

async function login(email: string, plainPassword: string) {
  const user = await getUserByEmail(email);
  if (user && authService.validatePassword(plainPassword, user.hashedPassword)) {
    return generateToken({ id: user.id });
  }
}

const userService = {
  login,
  signup,
}

export default userService;