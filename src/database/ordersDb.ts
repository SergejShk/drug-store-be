import { NodePgDatabase } from "drizzle-orm/node-postgres";

import orders, { NewOrder } from "./models/orders";

export class OrdersDb {
	constructor(private db: NodePgDatabase) {}

	public createOrder = async (newOrder: NewOrder) =>
		this.db
			.insert(orders)
			.values(newOrder)
			.returning()
			.then((res) => res[0]);
}
