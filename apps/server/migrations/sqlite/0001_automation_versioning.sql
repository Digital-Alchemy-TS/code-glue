ALTER TABLE `stored_automation` ADD `active_version_id` text;
--> statement-breakpoint
CREATE TABLE `automation_versions` (
	`activated_from_version_id` text,
	`automation_id` text NOT NULL,
	`body` text NOT NULL,
	`date` text NOT NULL,
	`documentation` text,
	`has_code_change` text NOT NULL DEFAULT 'true',
	`has_notes_change` text NOT NULL DEFAULT 'false',
	`id` text PRIMARY KEY NOT NULL,
	`is_active` text NOT NULL DEFAULT 'false',
	`is_draft` text NOT NULL DEFAULT 'false',
	`name` text,
	`notes` text,
	`parent_version_id` text,
	`was_auto_saved` text NOT NULL DEFAULT 'false',
	`written_by_ai` text NOT NULL DEFAULT 'false'
);
