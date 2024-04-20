import { eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { CreateUser, UserTable } from "../../drizzle/schema";

async function createUser(user: CreateUser) {
  // TODO - Handle duplicate emails
  const data = await db.insert(UserTable)
    .values(user)
    .returning({ id: UserTable.id });
  return data[0];
}

async function getUserInfoById(id: string) {
  const data = await db.select({ name: UserTable.name, email: UserTable.email, profilePicture: UserTable.profilePicture })
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

const userService = {
  createUser,
  getUserInfoById,
  getUserByEmail,
}

export default userService;
