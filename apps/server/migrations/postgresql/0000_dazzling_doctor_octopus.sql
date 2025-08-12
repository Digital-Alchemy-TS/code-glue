CREATE TABLE "import_types" (
	"active" text NOT NULL,
	"area" text,
	"body" text NOT NULL,
	"context" text NOT NULL,
	"create_date" timestamp NOT NULL,
	"documentation" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"labels" text NOT NULL,
	"last_update" timestamp NOT NULL,
	"parent" text,
	"title" text NOT NULL,
	"version" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_variables" (
	"create_date" timestamp NOT NULL,
	"documentation" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"labels" text NOT NULL,
	"last_update" timestamp NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stored_automation" (
	"active" text NOT NULL,
	"area" text,
	"body" text NOT NULL,
	"context" text NOT NULL,
	"create_date" timestamp NOT NULL,
	"documentation" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"labels" text NOT NULL,
	"last_update" timestamp NOT NULL,
	"parent" text,
	"title" text NOT NULL,
	"version" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "synapse_entities" (
	"attributes" text NOT NULL,
	"create_date" timestamp NOT NULL,
	"default_attributes" text NOT NULL,
	"default_config" text NOT NULL,
	"default_locals" text NOT NULL,
	"documentation" text NOT NULL,
	"icon" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"labels" text NOT NULL,
	"last_update" timestamp NOT NULL,
	"locals" text NOT NULL,
	"name" text NOT NULL,
	"suggested_object_id" text NOT NULL,
	"type" text NOT NULL
);
