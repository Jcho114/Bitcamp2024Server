import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  profilePicture: varchar("profilePicture"),
  hashedPassword: varchar("hashedPassword").notNull(),
});

export type User = typeof UserTable.$inferSelect;
export type CreateUser = typeof UserTable.$inferInsert;