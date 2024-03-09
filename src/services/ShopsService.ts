import { ShopsDb } from "../database/shopsDb";
import { NewShop } from "../database/models/shops";

export class ShopsService {
	private shopsDb: ShopsDb;

	constructor(shopsDb: ShopsDb) {
		this.shopsDb = shopsDb;
	}

	create = (newShop: NewShop) => {
		return this.shopsDb.createShop(newShop);
	};
}
