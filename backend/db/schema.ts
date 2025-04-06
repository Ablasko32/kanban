import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  pgEnum,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import path from "path";

/* All project boards table */
export const boardsTable = pgTable("boards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  boardName: varchar("board_name", { length: 100 }).notNull(),
  dateCreated: timestamp("date_created")
    .notNull()
    .default(sql`NOW()`),
});

/* Task enums */

export const statusEnum = pgEnum("status", ["open", "done", "progress"]);
export const priorityEnum = pgEnum("priority", ["low", "med", "high"]);

/* Containts all tasks linked to boardsTable  */
export const tasksTable = pgTable(
  "tasks",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    description: varchar({ length: 400 }),
    dateCreated: timestamp("date_created")
      .notNull()
      .default(sql`NOW()`),
    dueDate: timestamp("due_date"),
    priority: priorityEnum().notNull().default("low"),
    status: statusEnum().notNull().default("open"),
    boardId: integer("board_id").references(() => boardsTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [index("board_id_idx").on(table.boardId)]
);

// Serves as file metadata storage, each task can have asociated files
export const taskFilesTable = pgTable(
  "taskFiles",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 200 }).notNull(),
    type: varchar({ length: 50 }),
    size: integer(),
    path: varchar({ length: 250 }).notNull(),
    dateCreated: timestamp("date_created").default(sql`NOW()`),
    taskId: integer("task_id")
      .notNull()
      .references(() => tasksTable.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [index("task_id_idx").on(table.taskId)]
);
