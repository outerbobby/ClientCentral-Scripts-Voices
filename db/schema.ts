import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  
  // Tab specific data
  scriptWriting: jsonb("script_writing").default({}).notNull(),
  voiceActor: jsonb("voice_actor").default({}).notNull(),
  qualityControl: jsonb("quality_control").default({}).notNull(),
  trainingMap: jsonb("training_map").default({}).notNull()
});

export const insertClientSchema = createInsertSchema(clients);
export const selectClientSchema = createSelectSchema(clients);
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
