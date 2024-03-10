import { pgTable, serial, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

import { Product } from "./products";

interface IOrderProduct extends Product {
	count: number;
}

const orders = pgTable("orders", {
	id: serial("id").primaryKey().notNull(),
	customerName: varchar("customer_name").notNull(),
	email: varchar("email").notNull(),
	phone: varchar("phone").notNull(),
	address: varchar("address").notNull(),
	products: jsonb("products").$type<IOrderProduct[]>().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export default orders;

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;
