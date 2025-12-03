import { timestamp, pgTable, varchar, uuid, boolean } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    name: varchar("name", { length: 256 }).notNull(),
    password: varchar("password", { length: 512 }).notNull(),
    status: boolean("status").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;



