import { NodePgDatabase } from "drizzle-orm/node-postgres";

import products, { NewProduct } from "./models/products";

export class ProductsDb {
	constructor(private db: NodePgDatabase) {}

	public createProduct = async (newProduct: NewProduct) =>
		this.db
			.insert(products)
			.values(newProduct)
			.returning()
			.then((res) => res[0]);
}
