import { relations } from "drizzle-orm";
import { boolean, date, pgTable, time, uuid, varchar } from "drizzle-orm/pg-core";

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

export const ThreadTable = pgTable("thread", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: uuid("authorId").references(() => UserTable.id).notNull(),
  title: varchar("title").notNull(),
  content: varchar("content").notNull(),
  date: date("date").notNull(),
});

export const RootReplyTable = pgTable("rootreply", {
  id: uuid("id").primaryKey().defaultRandom(),
  threadId: uuid("threadId").references(() => ThreadTable.id).notNull(),
  authorId: uuid("authorId").references(() => UserTable.id).notNull(),
  content: varchar("content").notNull(),
  date: date("date").notNull(),
});

export const UserTableRelations = relations(UserTable, ({ many }) => {
  return {
    appointments: many(AppointmentRequestTable),
    threads: many(ThreadTable),
    rootReplies: many(RootReplyTable),
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

export const ThreadTableRelations = relations(ThreadTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [ThreadTable.authorId],
      references: [UserTable.id],
    }),
    rootReplies: many(RootReplyTable),
  }
});

export const RootReplyRelations = relations(RootReplyTable, ({ one }) => {
  return {
    author: one(UserTable, {
      fields: [RootReplyTable.authorId],
      references: [UserTable.id],
    }),
    thread: one(ThreadTable, {
      fields: [RootReplyTable.threadId],
      references: [ThreadTable.id],
    }),
  }
})

export type User = typeof UserTable.$inferSelect;
export type CreateUser = typeof UserTable.$inferInsert;

export type AppointmentRequest = typeof AppointmentRequestTable.$inferSelect;
export type CreateAppointmentRequest = typeof AppointmentRequestTable.$inferInsert;

export type Thread = typeof ThreadTable.$inferSelect;
export type CreateThread = typeof ThreadTable.$inferInsert;

export type RootReply = typeof RootReplyTable.$inferSelect;
export type CreateRootReply = typeof RootReplyTable.$inferInsert;
