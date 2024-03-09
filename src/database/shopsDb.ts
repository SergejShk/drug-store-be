import { NodePgDatabase } from "drizzle-orm/node-postgres";

import shops, { NewShop } from "./models/shops";

export class ShopsDb {
	constructor(private db: NodePgDatabase) {}

	public createShop = async (newShop: NewShop) =>
		this.db
			.insert(shops)
			.values(newShop)
			.returning()
			.then((res) => res[0]);

	public getShops = async () => this.db.select().from(shops);
}
