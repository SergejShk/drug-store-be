CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar NOT NULL,
	"products" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
