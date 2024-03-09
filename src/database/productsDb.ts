import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

import products, { NewProduct } from "./models/products";

export class ProductsDb {
	constructor(private db: NodePgDatabase) {}

	public createProduct = async (newProduct: NewProduct) =>
		this.db
			.insert(products)
			.values(newProduct)
			.returning()
			.then((res) => res[0]);

	public getProductsByShop = async (shopId: number) =>
		this.db.select().from(products).where(eq(products.shopId, shopId));
}
