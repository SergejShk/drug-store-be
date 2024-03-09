import { NewProduct } from "../database/models/products";
import { ProductsDb } from "../database/productsDb";

export class ProductsService {
	private productsDb: ProductsDb;

	constructor(productsDb: ProductsDb) {
		this.productsDb = productsDb;
	}

	create = (newProduct: NewProduct) => {
		return this.productsDb.createProduct(newProduct);
	};
}
