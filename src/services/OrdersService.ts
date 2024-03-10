import { OrdersDb } from "../database/ordersDb";
import { NewOrder } from "../database/models/orders";

export class OrdersService {
	private ordersDb: OrdersDb;

	constructor(ordersDb: OrdersDb) {
		this.ordersDb = ordersDb;
	}

	create = (newOrder: NewOrder) => {
		return this.ordersDb.createOrder(newOrder);
	};
}
