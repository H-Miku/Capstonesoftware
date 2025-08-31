import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const fitnessData = pgTable("fitness_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: date("date").notNull(),
  steps: integer("steps").notNull().default(0),
  stepGoal: integer("step_goal").notNull().default(8000),
  calories: integer("calories").notNull().default(0),
  distance: text("distance").notNull().default("0 km"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFitnessDataSchema = createInsertSchema(fitnessData).pick({
  userId: true,
  date: true,
  steps: true,
  stepGoal: true,
  calories: true,
  distance: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFitnessData = z.infer<typeof insertFitnessDataSchema>;
export type FitnessData = typeof fitnessData.$inferSelect;
