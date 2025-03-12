-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(60),
	"last_name" varchar(100) NOT NULL,
	"initials" varchar(30),
	"email" varchar(100) NOT NULL,
	"status" varchar(8) DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_status_check" CHECK ((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "users_addresses" (
	"user_id" integer NOT NULL,
	"address_type" varchar(7) NOT NULL,
	"valid_from" timestamp NOT NULL,
	"post_code" varchar(6) NOT NULL,
	"city" varchar(60) NOT NULL,
	"country_code" varchar(3) NOT NULL,
	"street" varchar(100) NOT NULL,
	"building_number" varchar(60) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_addresses_pkey" PRIMARY KEY("user_id","address_type","valid_from"),
	CONSTRAINT "users_addresses_address_type_check" CHECK ((address_type)::text = ANY ((ARRAY['HOME'::character varying, 'INVOICE'::character varying, 'POST'::character varying, 'WORK'::character varying])::text[]))
);
--> statement-breakpoint
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
*/