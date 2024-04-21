import { relations } from "drizzle-orm";
import { boolean, date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  profilePicture: varchar("profilePicture"),
  hashedPassword: varchar("hashedPassword").notNull(),
});

// Add tags later
export const AppointmentRequestTable = pgTable("appointmentrequest", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("studentId").references(() => UserTable.id).notNull(),
  date: date("date").notNull(),
  request: varchar("request").notNull(),
  resolved: boolean("resolved").notNull().default(false),
  tags: varchar("tags").array().notNull(),
});

export const UserTableRelations = relations(UserTable, ({ many }) => {
  return {
    appointments: many(AppointmentRequestTable)
  }
});

export const AppointmentTableRelations = relations(AppointmentRequestTable, ({ one }) => {
  return {
    student: one(UserTable, {
      fields: [AppointmentRequestTable.studentId],
      references: [UserTable.id],
    }),
  };
});

export type User = typeof UserTable.$inferSelect;
export type CreateUser = typeof UserTable.$inferInsert;

export type AppointmentRequest = typeof AppointmentRequestTable.$inferSelect;
export type CreateAppointmentRequest = typeof AppointmentRequestTable.$inferInsert;