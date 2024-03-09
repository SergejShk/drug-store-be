import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import dotenv from "dotenv";

import App from "./app";
import { ShopsController } from "./controllers/ShopsController";
import { ShopsService } from "./services/ShopsService";
import { ShopsDb } from "./database/shopsDb";
import { ProductsDb } from "./database/productsDb";
import { ProductsService } from "./services/ProductsService";
import { ProductsController } from "./controllers/ProductsController";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const STAGE = process.env.STAGE;
const DATABASE_URL = process.env.DATABASE_URL;

const serverStart = async () => {
	try {
		const pool = new Pool({
			connectionString: DATABASE_URL,
			ssl: true,
		});
		const db = drizzle(pool, {
			logger: STAGE === "LOCAL" ? true : false,
		});

		// migrations
		await migrate(db, { migrationsFolder: "./migrations" });

		// dbs
		const shopsDb = new ShopsDb(db);
		const productsDb = new ProductsDb(db);

		// services
		const shopsService = new ShopsService(shopsDb);
		const productsService = new ProductsService(productsDb);

		//controllers
		const shopsController = new ShopsController(shopsService);
		const productsController = new ProductsController(productsService);

		const app = new App(PORT, [shopsController, productsController]);

		app.listen();
	} catch (error: any) {
		console.log(error.message);
		process.exit(1);
	}
};

serverStart();
