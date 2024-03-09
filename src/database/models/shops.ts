import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

const shops = pgTable("shops", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export default shops;

export type Shop = InferSelectModel<typeof shops>;
export type NewShop = InferInsertModel<typeof shops>;
