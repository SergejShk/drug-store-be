import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

import shops from "./shops";

const products = pgTable("products", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name").notNull(),
	price: varchar("price").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	shopId: integer("shop_id")
		.references(() => shops.id)
		.notNull(),
});

export default products;

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
