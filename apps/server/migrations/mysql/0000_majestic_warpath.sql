CREATE TABLE `import_types` (
	`active` varchar(10) NOT NULL,
	`area` varchar(100),
	`body` text NOT NULL,
	`context` varchar(100) NOT NULL,
	`create_date` timestamp NOT NULL,
	`documentation` text NOT NULL,
	`id` varchar(36) NOT NULL,
	`labels` text NOT NULL,
	`last_update` timestamp NOT NULL,
	`parent` varchar(36),
	`title` varchar(255) NOT NULL,
	`version` varchar(50) NOT NULL,
	CONSTRAINT `import_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shared_variables` (
	`create_date` timestamp NOT NULL,
	`documentation` text NOT NULL,
	`id` varchar(36) NOT NULL,
	`labels` text NOT NULL,
	`last_update` timestamp NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` varchar(100) NOT NULL,
	`value` text NOT NULL,
	CONSTRAINT `shared_variables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stored_automation` (
	`active` varchar(10) NOT NULL,
	`area` varchar(100),
	`body` text NOT NULL,
	`context` varchar(100) NOT NULL,
	`create_date` timestamp NOT NULL,
	`documentation` text NOT NULL,
	`id` varchar(36) NOT NULL,
	`labels` text NOT NULL,
	`last_update` timestamp NOT NULL,
	`parent` varchar(36),
	`title` varchar(255) NOT NULL,
	`version` varchar(50) NOT NULL,
	CONSTRAINT `stored_automation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `synapse_entities` (
	`attributes` text NOT NULL,
	`create_date` timestamp NOT NULL,
	`default_attributes` text NOT NULL,
	`default_config` text NOT NULL,
	`default_locals` text NOT NULL,
	`documentation` text NOT NULL,
	`icon` varchar(100) NOT NULL,
	`id` varchar(36) NOT NULL,
	`labels` text NOT NULL,
	`last_update` timestamp NOT NULL,
	`locals` text NOT NULL,
	`name` varchar(255) NOT NULL,
	`suggested_object_id` varchar(255) NOT NULL,
	`type` varchar(100) NOT NULL,
	CONSTRAINT `synapse_entities_id` PRIMARY KEY(`id`)
);
